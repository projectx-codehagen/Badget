import { z } from "zod";

import { eq, schema } from "@projectx/db";
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

  listAllTransactions: protectedProcedure.query(async (opts) => {
    return await opts.ctx.db
      .select({
        id: schema.transaction.id,
        assetName: schema.asset.name,
        accountName: schema.account.name,
        categoryId: schema.transaction.categoryId,
        currencyIso: schema.transaction.currencyIso,
        originalId: schema.transaction.originalId,
        type: schema.transaction.type,
        amount: schema.transaction.amount,
        date: schema.transaction.date,
        description: schema.transaction.description,
      })
      .from(schema.transaction)
      .leftJoin(schema.asset, eq(schema.asset.id, schema.transaction.assetId))
      .leftJoin(
        schema.account,
        eq(schema.account.id, schema.transaction.accountId),
      )
      .execute();
  }),
  listTransactionsByAccountId: protectedProcedure
    .input(z.string())
    .query(async (opts: any) => {
      return await opts.ctx.db
        .select({
          id: schema.transaction.id,
          categoryId: schema.transaction.categoryId,
          currencyIso: schema.transaction.currencyIso,
          originalId: schema.transaction.originalId,
          type: schema.transaction.type,
          amount: schema.transaction.amount,
          date: schema.transaction.date,
          description: schema.transaction.description,
        })
        .from(schema.transaction)
        .where(eq(schema.transaction.accountId, BigInt(opts.input)))
        .execute();
    }),
});
