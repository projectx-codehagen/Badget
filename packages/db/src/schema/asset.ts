import { relations, sql } from "drizzle-orm";
import { index, json, pgEnum, timestamp, varchar } from "drizzle-orm/pg-core";

import { AssetType } from "../enum";
import { pgTable } from "./_table";

export const assetTypeEnum = pgEnum("account_type", [
  AssetType.STOCKS,
  AssetType.CRYPTO,
  AssetType.BONDS,
  AssetType.ETF,
  AssetType.OPTIONS,
  AssetType.FUTURES,
  AssetType.REAL_ESTATE,
  AssetType.COMMODITIES,
]);

export const asset = pgTable(
  "asset",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    userId: varchar("user_id", { length: 36 }),

    name: varchar("name", { length: 255 }).notNull(),
    assetType: assetTypeEnum("type").notNull(),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
    };
  },
);

export const assetRealEstate = pgTable("asset_real_estate", {
  id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  assetId: varchar("asset_id", { length: 30 }).notNull(),

  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  postalCode: varchar("postal_code", { length: 10 }).notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
});

/**
 * 👇 This code block will tell Drizzle that asset is related to:
 * - asset <-> real_estate -> 1-to-1
 */
export const assetRealEstateRelation = relations(
  assetRealEstate,
  ({ one }) => ({
    asset: one(asset, {
      fields: [assetRealEstate.assetId],
      references: [asset.id],
    }),
  }),
);
