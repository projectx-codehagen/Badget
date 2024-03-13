import { db, schema, sql } from "@projectx/db";
import { createAccountSchema } from "@projectx/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  addAccount: protectedProcedure
    .input(createAccountSchema)
    .mutation(async (opts: any) => {
      const { userId } = opts.ctx.auth;

      const accountQuery = await opts.ctx.db
        .insert(schema.account)
        .values({
          name: createAccountSchema.parse(opts.input).name,
          accountType:
            createAccountSchema.parse(opts.input).accountType ?? "BANK",
          userId,
          originalPayload: createAccountSchema.parse(opts.input),
        })
        .onDuplicateKeyUpdate({ set: { name: sql`name` } });

      if (accountQuery.rowsAffected === 0) {
        return { success: false };
      }

      await db.transaction(async (tx) => {
        await tx
          .insert(schema.balance)
          .values({
            accountId: BigInt(accountQuery.insertId),
            currencyIso: createAccountSchema.parse(opts.input).currencyIso,
            amount: createAccountSchema.parse(opts.input).amount ?? 0,
            date: new Date(),
            type: "AVAILABLE",
            originalPayload: createAccountSchema.parse(opts.input),
          })
          .onDuplicateKeyUpdate({
            set: {
              amount: sql`amount`,
              date: sql`date`,
            },
          });

        await tx
          .insert(schema.transaction)
          .values({
            accountId: BigInt(accountQuery.insertId),
            amount: createAccountSchema.parse(opts.input).amount ?? 0,
            currencyIso: createAccountSchema.parse(opts.input).currencyIso,
            date: new Date(),
            description: "Initial deposit",
            originalPayload: createAccountSchema.parse(opts.input),
          })
          .onDuplicateKeyUpdate({
            set: {
              amount: sql`amount`,
              date: sql`date`,
              description: sql`description`,
            },
          });
      });

      return { success: true, assetId: accountQuery.insertId };
    }),
});
