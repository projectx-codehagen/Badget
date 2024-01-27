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
} from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";

import { db } from "@projectx/db";

import { transformer } from "./transformer";

type AuthContext = SignedInAuthObject | SignedOutAuthObject;
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
  headers: Headers;
  auth: AuthContext;
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
export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: AuthContext;
  req?: NextRequest;
}) => {
  const apiKey = opts.req?.headers.get("x-projectx-api-key");

  return createInnerTRPCContext({
    auth: opts.auth,
    apiKey,
    req: opts.req,
    headers: opts.headers,
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
 * Reusable procedure that enforces users are logged in before running the
 * code
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
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
/**
 * Reusable procedure that enforces users are part of an organization before
 * running the code
 */
export const protectedOrgProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (!ctx.auth?.orgId) {
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
});
/**
 * Procedure that enforces users are admins of an organization before running
 * the code
 */
export const protectedAdminProcedure = protectedOrgProcedure.use(
  ({ ctx, next }) => {
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
