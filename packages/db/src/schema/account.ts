import { relations, sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { projectsToAccounts } from "./project";
import { transaction } from "./transaction";

export const account = mySqlTable(
  "account",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    clerkOrganizationId: varchar("clerk_organization_id", { length: 36 }),
    clerkUserId: varchar("clerk_user_id", { length: 36 }),
    mask: varchar("mask", { length: 4 }),
    name: varchar("name", { length: 256 }).notNull(),
    officialName: varchar("official_name", { length: 256 }),
    // persistentAccountId: varchar("persistent_account_id", { length: 256 }).notNull(), TODO: enable this only when we are able to support "Chase" items
    subType: varchar("sub_type", { length: 16 }), // NOTE: enum was too long
    type: varchar("type", { length: 16 }), // NOTE: enum was too long
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

export const balance = mySqlTable(
  "balance",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    accountId: bigint("account_id", { mode: "number" }).notNull(),

    available: float("available"),
    current: float("current"),
    isoCurrencyCode: varchar("iso_currency_code", { length: 3 }), // ISO 4217
    limit: float("limit"),
    unofficialCurrencyCode: varchar("unofficial_currency_code", {
      length: 4,
    }),
  },
  (table) => {
    return {
      accountIdIdx: uniqueIndex("account_id_idx").on(table.accountId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that accounts is related to:
 * - account <-> balance      -> 1-to-1
 * - account <-> transaction  -> 1-to-N
 * - account <-> project      -> N-to-N
 */
export const accountRelations = relations(account, ({ many, one }) => ({
  balance: one(balance),
  transactions: many(transaction),
  projectsToAccounts: many(projectsToAccounts),
}));
