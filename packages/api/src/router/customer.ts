import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { schema } from "@projectx/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  getAllCustomers: publicProcedure.query(async (opts) => {
    try {
      // Directly querying the user table using the schema defined in Drizzle
      const customers = await opts.ctx.db
        .select({
          id: schema.customer.id,
        })
        .from(schema.customer)
        .execute();

      return customers.map((user) => ({
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
});
