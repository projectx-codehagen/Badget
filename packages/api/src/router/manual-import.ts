import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db, schema, sql } from "@projectx/db";

import { manualImportSchema } from "@projectx/validators";
import { nanoid } from 'nanoid'
import { z } from "zod";

export const manualImportRouter = createTRPCRouter({
  manualImport: protectedProcedure
    .input(z.object({
      import: manualImportSchema,
      accountId: z.string(),
    }))
    .mutation(async (opts: any) => {
      await db.transaction(async (tx) => {
        await tx
          .insert(schema.balance)
          .values({
            id: `prefix_${nanoid(16)}`,
            accountId: opts.input.accountId,
            currencyIso: "USD",
            amount: manualImportSchema.parse(opts.input.import).amount,
            date: manualImportSchema.parse(opts.input.import).date,
            originalPayload: manualImportSchema.parse(opts.input.import),
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
            accountId: opts.input.accountId,
            currencyIso: "USD",
            amount: manualImportSchema.parse(opts.input.import).amount,
            date: manualImportSchema.parse(opts.input.import).date,
            description: manualImportSchema.parse(opts.input.import).description,
            originalPayload: manualImportSchema.parse(opts.input.import),
          })
          .onConflictDoUpdate({
            target: schema.transaction.id,
            set: {
              amount: opts.input.import.amount,
              date: sql`EXCLUDED.date`,
              description: opts.input.import.description,
            },
          });
      });
      return { success: true };
    }),
});
