import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  json,
  mysqlEnum,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core";

import { ItemStatus } from "../enum";
import { mySqlTable } from "./_table";

export const item = mySqlTable(
  "item",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    externalId: varchar("external_id", { length: 64 }).unique().notNull(), // can be requisitionId or plaidItemId for example
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    clerkOrganizationId: varchar("clerk_organization_id", { length: 36 }),
    clerkUserId: varchar("clerk_user_id", { length: 64 }).notNull(),

    accessToken: varchar("access_token", { length: 255 }).unique().notNull(),
    institutionId: varchar("institution_id", {
      length: 64,
    }).notNull(),
    status: mysqlEnum("status", [ItemStatus.BAD, ItemStatus.GOOD]).notNull(),
    updateType: varchar("update_type", { length: 64 }),
    error: json("error"),
    consentExpirationTime: timestamp("consent_expiration_time"),
    lastTransactionUpdateCursor: varchar("last_transaction_update_cursor", {
      length: 128,
    }),
    additionalData: json("additional_data"),
  },
  (table) => {
    return {
      clerkOrganizationIdIdx: index("clerk_organization_id_idx").on(
        table.clerkOrganizationId,
      ),
      clerkUserIdIdx: index("clerk_user_id_idx").on(table.clerkUserId),
      // TODO: clerkOrganizationId >-< clerkUserId
      clerkUserIdInstitutionIdUniqueKey: unique(
        "clerk_user_id_intitution_id",
      ).on(table.clerkUserId, table.institutionId),
    };
  },
);
