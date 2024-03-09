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

import { AccountType, BalanceType } from "../enum";
import { mySqlTable } from "./_table";
import { asset } from "./asset";
import { currency } from "./currency";
import { resource } from "./provider";

export const account = mySqlTable(
  "account",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    resourceId: bigint("resource_id", { mode: "bigint" }),
    originalId: varchar("original_id", { length: 36 }),
    orgId: varchar("org_id", { length: 36 }),
    userId: varchar("user_id", { length: 36 }),

    name: varchar("name", { length: 255 }).notNull(),
    accountType: mysqlEnum("account_type", [
      AccountType.BANK,
      AccountType.CRYPTO,
      AccountType.INVESTMENT,
    ])
      .notNull()
      .default(AccountType.BANK),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      orgIdIdx: index("org_id_idx").on(table.orgId),
      userIdIdx: index("user_id_idx").on(table.userId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that account is related to:
 * - account <-> balance      -> 1-to-N
 * - account <-> transaction  -> 1-to-N
 * - account <-> resource     -> 1-to-1
 */
export const accountRelations = relations(account, ({ many, one }) => ({
  balances: many(balance),
  transactions: many(transaction),
  resource: one(resource, {
    fields: [account.resourceId],
    references: [resource.id],
  }),
}));

export const balance = mySqlTable(
  "balance",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    accountId: bigint("account_id", { mode: "bigint" }),
    assetId: bigint("asset_id", { mode: "bigint" }),
    currencyIso: varchar("currency_iso", { length: 3 }).notNull(),

    amount: float("amount").notNull(),
    date: timestamp("date").notNull(),
    type: mysqlEnum("type", [
      BalanceType.AVAILABLE,
      BalanceType.BOOKED,
      BalanceType.EXPECTED,
    ]).notNull(),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      accountIdIdx: index("account_id_idx").on(table.accountId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that balance is related to:
 * - balance <-> account      -> 1-to-1
 * - balance <-> asset      -> 1-to-1
 * - balance <-> currency     -> 1-to-1
 */
export const balanceRelations = relations(balance, ({ one }) => ({
  account: one(account, {
    fields: [balance.accountId],
    references: [account.id],
  }),
  asset: one(asset, {
    fields: [balance.assetId],
    references: [asset.id],
  }),
  currency: one(currency, {
    fields: [balance.currencyIso],
    references: [currency.iso],
  }),
}));

export const category = mySqlTable("category", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  name: varchar("name", { length: 63 }).notNull(),
  icon: varchar("icon", { length: 63 }).notNull(),
});

/**
 * 👇 This code block will tell Drizzle that category is related to:
 * - cateogry <-> transaction -> 1-to-1
 */
export const categoryRelations = relations(category, ({ many }) => ({
  transactions: many(transaction),
}));

export const transaction = mySqlTable(
  "transaction",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    accountId: bigint("account_id", { mode: "bigint" }),
    assetId: bigint("asset_id", { mode: "bigint" }),
    categoryId: bigint("category_id", { mode: "bigint" }),
    currencyIso: varchar("currency_iso", { length: 3 }).notNull(),
    originalId: varchar("original_id", { length: 36 }),

    amount: float("amount").notNull(),
    date: timestamp("date").notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      accountIdIdx: index("account_id_idx").on(table.accountId),
      originalIdUnqIdx: uniqueIndex("original_id_unq_idx").on(table.originalId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that transaction is related to:
 * - transaction <-> account  -> 1-to-1
 * - transaction <-> asset  -> 1-to-1
 * - transaction <-> category -> 1-to-1
 * - transaction <-> currency -> 1-to-1
 */
export const transactionRelations = relations(transaction, ({ one }) => ({
  account: one(account, {
    fields: [transaction.accountId],
    references: [account.id],
  }),
  asset: one(asset, {
    fields: [transaction.assetId],
    references: [asset.id],
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id],
  }),
  currency: one(currency, {
    fields: [transaction.currencyIso],
    references: [currency.iso],
  }),
}));
