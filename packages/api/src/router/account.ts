import { nanoid } from "nanoid";
import { bigint } from "zod";

import { AccountType, BalanceType, db, eq, schema, sql } from "@projectx/db";
import { createAccountSchema, createEnumSchema } from "@projectx/validators";

import { balanceTypeEnum } from "../../../db/src/schema/openbanking";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
          set: { name: sql`excluded.name` },
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
            type: "DIRECT",
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

  // Update getAllAccounts to filter by userId
  getAllAccounts: protectedProcedure.query(async (opts) => {
    const { userId } = opts.ctx.auth; // Get userId from the authentication context

    try {
      const accounts = await opts.ctx.db
        .select({
          id: schema.account.id,
          createdAt: schema.account.createdAt,
          updatedAt: schema.account.updatedAt,
          userId: schema.account.userId,
          name: schema.account.name,
          accountType: schema.account.accountType,
          originalPayload: schema.account.originalPayload,
        })
        .from(schema.account)
        .where(eq(schema.account.userId, userId)) // Filter by userId
        .execute();

      return accounts.map((account) => ({
        id: account.id,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        userId: account.userId,
        name: account.name,
        accountType: account.accountType,
        originalPayload: account.originalPayload,
      }));
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
      return { success: false, message: "Failed to fetch accounts" };
    }
  }),
});
