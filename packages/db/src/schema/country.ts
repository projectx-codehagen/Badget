import { sql } from "drizzle-orm";
import { bigint, boolean, timestamp, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const country = mySqlTable("country", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  iso: varchar("iso", { length: 2 }).unique(),
  name: varchar("name", { length: 63 }).notNull(),
  active: boolean("active").default(true),
});
