import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  json,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { ResourceStatus } from "../enum";
import { mySqlTable } from "./_table";

export const resource = mySqlTable(
  "resource",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    externalId: varchar("external_id", { length: 64 }).unique().notNull(), // can be requisitionId or plaidItemId for example
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    clerkOrganizationId: varchar("clerk_organization_id", { length: 36 }),
    clerkUserId: varchar("clerk_user_id", { length: 64 }).notNull(),
    externalKey: varchar("external_key", { length: 255 }).unique().notNull(),
    integrationId: varchar("integration_id", {
      length: 64,
    }).notNull(),
    status: mysqlEnum("status", [
      ResourceStatus.BAD,
      ResourceStatus.GOOD,
    ]).notNull(),
    consentExpirationTime: timestamp("consent_expiration_time"),
    additionalData: json("additional_data"),
  },
  (table) => {
    return {
      clerkOrganizationIdIdx: index("clerk_organization_id_idx").on(
        table.clerkOrganizationId,
      ),
      clerkUserIdIdx: index("clerk_user_id_idx").on(table.clerkUserId),
    };
  },
);
