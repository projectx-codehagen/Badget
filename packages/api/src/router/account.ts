import { AccountType, BalanceType, db, schema, sql } from "@projectx/db";
import { createAccountSchema, createEnumSchema } from "@projectx/validators";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { balanceTypeEnum } from "../../../db/src/schema/openbanking";
import { bigint } from "zod";
import { nanoid } from 'nanoid'

export const accountRouter = createTRPCRouter({
  addAccount: protectedProcedure
    .input(createAccountSchema)
    .mutation(async (opts: any) => {
      const { userId } = opts.ctx.auth;

      const accountQuery = await opts.ctx.db
        .insert(schema.account)
        .values({
          id: `prefix_${nanoid(16)}`,
          userId: userId,
          name: createAccountSchema.parse(opts.input).name,
          accountType:
            createAccountSchema.parse(opts.input).accountType ?? "BANK",
          originalPayload: createAccountSchema.parse(opts.input),
        })
        .returning()
        .onConflictDoUpdate({
          target: schema.account.id,
          set: { name: sql`excluded.name` }
        });

      if (accountQuery.rowCount === 0) {
        return { success: false };
      }

      await db.transaction(async (tx) => {
        const accountId = accountQuery[0].id;

        await tx
          .insert(schema.balance)
          .values({
            id: `prefix_${nanoid(16)}`,
            accountId: accountId,
            currencyIso: createAccountSchema.parse(opts.input).currencyIso,
            amount: createAccountSchema.parse(opts.input).amount,
            date: new Date(),
            originalPayload: createAccountSchema.parse(opts.input),
            type: 'DIRECT',
          })
          .onConflictDoUpdate({
            target: schema.balance.id,
            set: {
              amount: sql`EXCLUDED.amount`,
              date: sql`EXCLUDED.date`,
            },
          });

        await tx
          .insert(schema.transaction)
          .values({
            id: `prefix_${nanoid(16)}`,
            accountId: accountId,
            currencyIso: createAccountSchema.parse(opts.input).currencyIso,
            amount: createAccountSchema.parse(opts.input).amount,
            date: new Date(),
            description: "Initial deposit",
            originalPayload: createAccountSchema.parse(opts.input),
          })
          .onConflictDoUpdate({
            target: schema.transaction.id,
            set: {
              amount: sql`EXCLUDED.amount`,
              date: sql`EXCLUDED.date`,
              description: sql`EXCLUDED.description`,
            },
          });
      });

      return { success: true, assetId: accountQuery.insertId };
    }),

  fetchAll: protectedProcedure.query(async (opts) => {
    const accountList = await opts.ctx.db
      .select({
        id: schema.account.id,
        // name: schema.account.name,
        // accountType: schema.account.accountType,
      })
      .from(schema.account)
      .limit(1)
      .execute();

    return accountList;
  }),
});
