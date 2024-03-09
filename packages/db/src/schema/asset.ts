import { relations, sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  json,
  mysqlEnum,
  timestamp,
  uniqueIndex,
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
      //   AssetType.STOCKS,
      //   AssetType.CRYPTO,
      //   AssetType.BONDS,
      //   AssetType.ETF,
      //   AssetType.OPTIONS,
      //   AssetType.FUTURES,
      AssetType.REAL_ESTATE,
      //   AssetType.COMMODITIES,
    ]).notNull(),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  },
);
