import { relations, sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  int,
  json,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";
import { account } from "./account";

export const transaction = mySqlTable(
  "transaction",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    externalId: varchar("external_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    accountId: bigint("account_id", { mode: "number" }).notNull(),

    accountOwner: varchar("account_owner", { length: 256 }),
    amount: float("amount").notNull(),
    authorizedDate: timestamp("authorized_date"),
    authorizedDateTime: timestamp("authorized_datetime"),
    categoryId: int("category_id").notNull(),
    clerkUserId: varchar("clerk_user_id", { length: 38 }).notNull(),
    date: timestamp("date"),
    dateTime: timestamp("datetime"),
    isoCurrencyCode: varchar("iso_currency_code", { length: 3 }),
    merchantEntityId: varchar("merchant_entity_id", { length: 128 }), // A unique, stable, Plaid-generated ID that maps to the merchant.
    merchantName: varchar("merchant_name", { length: 256 }),
    originalDescription: varchar("original_description", { length: 256 }),
    transactionCode: varchar("transaction_code", { length: 64 }),
    additionalData: json("additional_data"),
    excludedAt: timestamp("excluded_at"),
  },
  (table) => {
    return {
      accountIdIdx: index("account_id_idx").on(table.accountId),
      clerkUserIdIdx: index("clerk_user_id_idx").on(table.clerkUserId),
    };
  },
);

export const merchant = mySqlTable(
  "merchant",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    name: varchar("name", { length: 256 }).notNull(),
    logoUrl: varchar("logo_url", { length: 128 }),
    website: varchar("website", { length: 128 }),
    entityId: varchar("entity_id", { length: 64 }),
    additionalData: json("additional_data"),
  },
  (table) => {
    return {
      entityIdIdx: index("entity_id_idx").on(table.entityId),
    };
  },
);

// 👇 This code block defines which columns in the two tables are related
export const transactionRelations = relations(transaction, ({ one }) => ({
  account: one(account, {
    fields: [transaction.accountId],
    references: [account.id],
  }),
}));

export const transactionMerchantRelations = relations(
  transaction,
  ({ one }) => ({
    merchant: one(merchant, {
      fields: [transaction.merchantEntityId],
      references: [merchant.entityId],
    }),
  }),
);
