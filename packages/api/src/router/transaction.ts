import { db, schema, sql } from "@projectx/db";
import {
  createAccountSchema,
  createTransactionSchema,
} from "@projectx/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
  addTransaction: protectedProcedure
    .input(createAccountSchema)
    .mutation(async (opts: any) => {
      const transactionQuery = await opts.ctx.db
        .insert(schema.transaction)
        .values({
          accountId: createTransactionSchema.parse(opts.ctx.input.accountId),
          assetId: createTransactionSchema.parse(opts.ctx.input.assetId),
          currencyIso: createTransactionSchema.parse(
            opts.ctx.input.currencyIso,
          ),
          originalId: createTransactionSchema.parse(opts.ctx.input.originalId),
          amount: createTransactionSchema.parse(opts.ctx.input.amount) ?? 0,
          date: createTransactionSchema.parse(opts.ctx.input.date),
          description: createTransactionSchema.parse(
            opts.ctx.input.description,
          ),
          originalPayload: createTransactionSchema.parse(
            opts.ctx.input.originalPayload,
          ),
        });

      if (transactionQuery.rowsAffected === 0) {
        return { success: false };
      }

      return { success: true };
    }),
});
