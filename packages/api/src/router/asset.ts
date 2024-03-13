import { AssetType, db, schema, sql } from "@projectx/db";
import {
  createAssetSchema,
  createRealEstateSchema,
} from "@projectx/validators";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const assetRouter = createTRPCRouter({
  addGenericAsset: protectedProcedure
    .input(createAssetSchema)
    .mutation(async (opts: any) => {
      const { userId } = opts.ctx.auth;

      const assetQuery = await opts.ctx.db
        .insert(schema.asset)
        .values({
          name: createAssetSchema.parse(opts.input).name,
          userId,
          assetType: AssetType.REAL_ESTATE,
          originalPayload: createAssetSchema.parse(opts.input),
        })
        .onDuplicateKeyUpdate({ set: { name: sql`name` } });

      if (assetQuery.rowsAffected === 0) {
        return { success: false };
      }

      await db.transaction(async (tx) => {
        await tx
          .insert(schema.balance)
          .values({
            assetId: BigInt(assetQuery.insertId),
            currencyIso: createAssetSchema.parse(opts.input).currencyIso,
            amount: createAssetSchema.parse(opts.input).amount ?? 0,
            date: new Date(),
            type: "AVAILABLE",
            originalPayload: createAssetSchema.parse(opts.input),
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
            assetId: BigInt(assetQuery.insertId),
            amount: createAssetSchema.parse(opts.input).amount ?? 0,
            currencyIso: createAssetSchema.parse(opts.input).currencyIso,
            date: new Date(),
            description: "Initial deposit",
            originalPayload: createAssetSchema.parse(opts.input),
          })
          .onDuplicateKeyUpdate({
            set: {
              amount: sql`amount`,
              date: sql`date`,
              description: sql`description`,
            },
          });
      });

      return { success: true, assetId: assetQuery.insertId };
    }),
  addRealEstate: protectedProcedure
    .input(createRealEstateSchema)
    .mutation(async (opts: any) => {
      const response = await opts.ctx.db.insert(schema.assetRealEstate).values({
        assetId: createRealEstateSchema.parse(opts.input).assetId,
        address: createRealEstateSchema.parse(opts.input).address,
        city: createRealEstateSchema.parse(opts.input).city,
        state: createRealEstateSchema.parse(opts.input).state,
        postalCode: createRealEstateSchema.parse(opts.input).postalCode,
        purchaseDate: createRealEstateSchema.parse(opts.input).purchaseDate,
      });

      if (response.insertId === 0) {
        return { success: false };
      }

      return { success: true };
    }),
});
