import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  json,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { AssetType } from "../enum";
import { mySqlTable } from "./_table";

export const asset = mySqlTable(
  "asset",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    userId: varchar("user_id", { length: 36 }),

    name: varchar("name", { length: 255 }).notNull(),
    assetType: mysqlEnum("asset_type", [
      AssetType.STOCKS,
      AssetType.CRYPTO,
      AssetType.BONDS,
      AssetType.ETF,
      AssetType.OPTIONS,
      AssetType.FUTURES,
      AssetType.REAL_ESTATE,
      AssetType.COMMODITIES,
    ]).notNull(),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  },
);

export const assetRealEstate = mySqlTable("asset_real_estate", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  assetId: bigint("asset_id", { mode: "bigint" }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  postalCode: varchar("postal_code", { length: 10 }).notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
});

export const assetRealEstateRelation = relations(
  assetRealEstate,
  ({ one }) => ({
    asset: one(asset, {
      fields: [assetRealEstate.assetId],
      references: [asset.id],
    }),
  }),
);
