import { relations, sql } from "drizzle-orm";
import { bigint, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "../_table";
import { asset } from "../asset";

export const assetRealEstate = mySqlTable("asset_real_estate", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
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

export const assetRealEstateRelation = relations(asset, ({ one }) => ({
  asset: one(assetRealEstate, {
    fields: [asset.id],
    references: [assetRealEstate.id],
  }),
}));
