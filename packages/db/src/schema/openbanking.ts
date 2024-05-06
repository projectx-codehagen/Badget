import { relations, sql } from "drizzle-orm";
import {
  decimal,
  index,
  json,
  pgEnum,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { AccountType, BalanceType } from "../enum";
import { pgTable } from "./_table";
import { asset } from "./asset";
import { currency } from "./currency";
import { resource } from "./provider";

export const accountTypeEnum = pgEnum("account_type", [
  AccountType.BANK,
  AccountType.CRYPTO,
  AccountType.INVESTMENT,
]);

export const account = pgTable(
  "account",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    resourceId: varchar("resource_id", { length: 30 }),
    originalId: varchar("original_id", { length: 36 }),
    orgId: varchar("org_id", { length: 36 }),
    userId: varchar("user_id", { length: 36 }),

    name: varchar("name", { length: 255 }).notNull(),
    accountType: accountTypeEnum("account_type")
      .notNull()
      .default(AccountType.BANK),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      orgIdIdx: index().on(table.orgId),
      userIdIdx: index().on(table.userId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that account is related to:
 * - account <-> balance     -> 1-to-N
 * - account <-> transaction -> 1-to-N
 * - account <-> resource    -> 1-to-1
 */
export const accountRelations = relations(account, ({ many, one }) => ({
  balances: many(balance),
  transactions: many(transaction),
  resource: one(resource, {
    fields: [account.resourceId],
    references: [resource.id],
  }),
}));

export const balanceTypeEnum = pgEnum("type", [
  BalanceType.AVAILABLE,
  BalanceType.BOOKED,
  BalanceType.EXPECTED
]);

export const balance = pgTable(
  "balance",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    accountId: varchar("account_id", { length: 30 }),
    assetId: varchar("asset_id", { length: 30 }),
    currencyIso: varchar("currency_iso", { length: 3 }).notNull(),

    amount: decimal("amount").notNull(),
    date: timestamp("date").notNull(),
    type: balanceTypeEnum("type").default(BalanceType.AVAILABLE),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      accountIdIdx: index().on(table.accountId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that balance is related to:
 * - balance <-> account  -> 1-to-1
 * - balance <-> asset    -> 1-to-1
 * - balance <-> currency -> 1-to-1
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

export const category = pgTable("category", {
  id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

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

export const transaction = pgTable(
  "transaction",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    accountId: varchar("account_id", { length: 30 }),
    assetId: varchar("asset_id", { length: 30 }),
    categoryId: varchar("category_id", { length: 30 }),
    currencyIso: varchar("currency_iso", { length: 3 }).notNull(),
    originalId: varchar("original_id", { length: 36 }),

    amount: decimal("amount").notNull(),
    date: timestamp("date").notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    originalPayload: json("original_payload"),
  },
  (table) => {
    return {
      accountIdIdx: index().on(table.accountId),
      originalIdUnqIdx: uniqueIndex().on(table.originalId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that transaction is related to:
 * - transaction <-> account  -> 1-to-1
 * - transaction <-> asset    -> 1-to-1
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
