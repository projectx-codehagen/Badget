import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  json,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const institution = mySqlTable(
  "institution",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    institutionId: varchar("institution_id", { length: 64 }),
    name: varchar("name", { length: 64 }),
    countryCodes: json("country_codes"),
    url: varchar("url", { length: 64 }),
    primaryColor: varchar("primary_color", { length: 64 }),
    logo: varchar("logo", { length: 64 }),
    status: json("status").notNull(),
    total: int("total").notNull(),
  },
  (table) => {
    return {
      institutionIdIdx: index("instistution_id_idx").on(table.institutionId),
    };
  },
);
