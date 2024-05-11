import { AssetType, db, schema, sql } from "@projectx/db";
import {
  createAssetSchema,
  createRealEstateSchema,
} from "@projectx/validators";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { nanoid } from 'nanoid'
import { z } from "zod";

export const assetRouter = createTRPCRouter({
  addGenericAsset: protectedProcedure
    .input(createAssetSchema)
    .mutation(async (opts: any) => {
      const { userId } = opts.ctx.auth;

      const assetQuery = await opts.ctx.db
        .insert(schema.asset)
        .values({
          id: `prefix_${nanoid(16)}`,
          userId: userId,
          name: createAssetSchema.parse(opts.input).name,
          // assetType: createAssetSchema.parse(opts.input).assetType,
          assetType: 'BANK',
          originalPayload: opts.input,
        })
        .returning()
        .onConflictDoUpdate({
          target: schema.asset.id,
          set: { name: sql`excluded.name` }
        });

      if (assetQuery.rowCount === 0) {
        return { success: false };
      }

      await db.transaction(async (tx) => {
        const accountId = assetQuery[0].id;
        await tx
          .insert(schema.balance)
          .values({
            id: `prefix_${nanoid(16)}`,
            accountId: accountId,
            currencyIso: createAssetSchema.parse(opts.input).currencyIso,
            amount: createAssetSchema.parse(opts.input).amount,
            date: new Date(),
            originalPayload: createAssetSchema.parse(opts.input),
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
            currencyIso: createAssetSchema.parse(opts.input).currencyIso,
            amount: createAssetSchema.parse(opts.input).amount,
            date: new Date(),
            description: "Initial deposit",
            originalPayload: createAssetSchema.parse(opts.input),
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

      return { success: true, assetId: assetQuery[0].id };
    }),
  addRealEstate: protectedProcedure
    .input(z.object({
      data: createRealEstateSchema,
      assetId: z.string(),
    })
    )
    .mutation(async (opts: any) => {
      const response = await opts.ctx.db.insert(schema.assetRealEstate).values({
        id: `prefix_${nanoid(16)}`,
        assetId: opts.input.assetId,
        address: createRealEstateSchema.parse(opts.input.data).address,
        city: createRealEstateSchema.parse(opts.input.data).city,
        state: createRealEstateSchema.parse(opts.input.data).state,
        postalCode: createRealEstateSchema.parse(opts.input.data).postalCode,
        purchaseDate: createRealEstateSchema.parse(opts.input.data).purchaseDate,
      });

      if (response.insertId === 0) {
        return { success: false };
      }

      return { success: true };
    }),
});
