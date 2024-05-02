import { sql } from "drizzle-orm";
import { boolean, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const country = pgTable("country", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  iso: varchar("iso", { length: 2 }).unique(),
  name: varchar("name", { length: 63 }).notNull(),
  active: boolean("active").default(true),
});
