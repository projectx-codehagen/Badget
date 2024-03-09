import { db, schema, sql } from "@projectx/db";
import { createAccountSchema } from "@projectx/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  addBankAccount: protectedProcedure
    .input(createAccountSchema)
    .mutation(async (opts: any) => {
      const { userId } = opts.ctx.auth;

      await db.transaction(async (tx) => {
        const accountQuery = await tx
          .insert(schema.account)
          .values({
            name: createAccountSchema.parse(opts.input).name,
            userId,
            originalPayload: createAccountSchema.parse(opts.input),
          })
          .onDuplicateKeyUpdate({ set: { name: sql`name` } });

        await tx
          .insert(schema.balance)
          .values({
            accountId: BigInt(accountQuery.insertId),
            currencyIso: createAccountSchema.parse(opts.input).currencyIso,
            amount: createAccountSchema.parse(opts.input).amount ?? 0,
            date: new Date(),
            type: "AVAILABLE",
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
    }),
});
