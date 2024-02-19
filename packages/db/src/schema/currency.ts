import { sql } from "drizzle-orm";
import { bigint, int, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const currency = mySqlTable("currency", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  iso: varchar("iso", { length: 3 }).unique().notNull(),
  symbol: varchar("symbol", { length: 5 }).notNull(),
  numericCode: int("numeric_code"),
});
