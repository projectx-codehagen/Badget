import { sql } from "drizzle-orm";
import { integer, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const currency = pgTable("currency", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  iso: varchar("iso", { length: 3 }).unique().notNull(),
  symbol: varchar("symbol", { length: 5 }).notNull(),
  numericCode: integer("numeric_code"),
});
