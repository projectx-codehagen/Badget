import { schema } from "@projectx/db";
import { createTransactionSchema } from "@projectx/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
  addTransaction: protectedProcedure
    .input(createTransactionSchema)
    .mutation(async (opts: any) => {
      const response = await opts.ctx.db.insert(schema.transaction).values({
        accountId: createTransactionSchema.parse(opts.input).accountId,
        assetId: createTransactionSchema.parse(opts.input).assetId,
        currencyIso: createTransactionSchema.parse(opts.input).currencyIso,
        amount: createTransactionSchema.parse(opts.input).amount,
        date: createTransactionSchema.parse(opts.input).date,
        description: createTransactionSchema.parse(opts.input).description,
        originalPayload: createTransactionSchema.parse(opts.input),
        type: createTransactionSchema.parse(opts.input).type,
      });

      if (response.insertId === 0) {
        return { success: false };
      }

      return { success: true };
    }),
});
