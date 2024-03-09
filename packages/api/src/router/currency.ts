import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { schema } from "@projectx/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const currencyRouter = createTRPCRouter({
  findAll: publicProcedure.query(async (opts) => {
    // Directly querying the user table using the schema defined in Drizzle
    const currencyList = await opts.ctx.db
      .select({
        iso: schema.currency.iso,
        symbol: schema.currency.symbol,
      })
      .from(schema.currency)
      .execute();

    return currencyList;
  }),
});
