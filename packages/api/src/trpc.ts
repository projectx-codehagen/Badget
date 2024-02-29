/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import type { NextRequest } from "next/server";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/api";
import { getAuth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import { and, db, eq, isNull, schema } from "@projectx/db";

import { transformer } from "./transformer";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
interface CreateContextOptions {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
  apiKey?: string | null;
  req?: NextRequest;
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    ...opts,
    db,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: { req: NextRequest }) => {
  const auth = getAuth(opts.req);
  const apiKey = opts.req.headers.get("x-acme-api-key");

  return createInnerTRPCContext({
    auth,
    apiKey,
    req: opts.req,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;
export const mergeRouters = t.mergeRouters;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: {
        ...ctx.auth,
        userId: ctx.auth.userId,
      },
    },
  });
});

const enforceUserInOrg = enforceUserIsAuthed.unstable_pipe(
  async ({ ctx, next }) => {
    if (!ctx.auth.orgId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be in an organization to perform this action",
      });
    }

    return next({
      ctx: {
        auth: {
          ...ctx.auth,
          orgId: ctx.auth.orgId,
        },
      },
    });
  },
);

const enforceUserIsAdmin = enforceUserInOrg.unstable_pipe(
  async ({ ctx, next }) => {
    if (ctx.auth.orgRole !== "admin") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be an admin to perform this action",
      });
    }

    return next({
      ctx: {
        auth: {
          ...ctx.auth,
          orgRole: ctx.auth.orgRole,
        },
      },
    });
  },
);

/**
 * Middleware to parse form data and put it in the rawInput
 */
export const formdataMiddleware = t.middleware(async (opts) => {
  const formData = await opts.ctx.req?.formData?.();
  if (!formData) throw new TRPCError({ code: "BAD_REQUEST" });

  return opts.next({
    rawInput: formData,
  });
});
/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const protectedOrgProcedure = t.procedure.use(enforceUserInOrg);
export const protectedAdminProcedure = t.procedure.use(enforceUserIsAdmin);

export const protectedApiFormDataProcedure =
  t.procedure.use(formdataMiddleware);
