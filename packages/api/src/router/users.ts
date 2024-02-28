import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { eq, schema, UserStatus } from "@projectx/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async (opts) => {
    try {
      // Directly querying the user table using the schema defined in Drizzle
      const users = await opts.ctx.db
        .select({
          id: schema.user.id,
        })
        .from(schema.user)
        .execute();

      return users.map((user) => ({
        id: user.id,
        // Map other fields as necessary
      }));
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch users",
      });
    }
  }),
  getUser: publicProcedure.query(async (opts) => {
    try {
      // Directly querying the user table using the schema defined in Drizzle
      const users = await opts.ctx.db
        .select({
          id: schema.user.id,
        })
        .from(schema.user)
        .where(eq(schema.user.clerkUserId, opts.input.clerkUserId))
        .execute();

      return users.map((user) => ({
        id: user.id,
        // Map other fields as necessary
      }));
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch users",
      });
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        clerkUserId: z.string(),
        status: z.enum([
          UserStatus.ACTIVE,
          UserStatus.INACTIVE,
          UserStatus.BLOCKED,
          UserStatus.BANNED,
          UserStatus.DELETED,
        ]),
      }),
    )
    .mutation(async (opts) => {
      const getCustomerId = async (
        clerkUserId: string,
      ): Promise<number | null> => {
        const customer = await opts.ctx.db
          .select({
            id: schema.customer.id,
          })
          .from(schema.customer)
          .where(eq(schema.customer.clerkUserId, clerkUserId))
          .execute();

        if (customer.length === 0) {
          return null;
        }

        return customer[0]?.id;
      };

      return opts.ctx.db
        .insert(schema.user)
        .values({
          status: opts.input.status,
          clerkUserId: opts.ctx.auth.userId,
          customerId:
            (await getCustomerId(opts.input.clerkUserId)) ?? undefined,
        })
        .execute();
    }),
});
