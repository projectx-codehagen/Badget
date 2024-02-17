import { relations, sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  int,
  json,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { BalanceType } from "../enum";
import { mySqlTable } from "./_table";
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

    resourceId: bigint("resource_id", { mode: "bigint" }).notNull(),
    orgId: varchar("org_id", { length: 36 }),
    userId: varchar("user_id", { length: 36 }),

    name: varchar("name", { length: 255 }).notNull(),
    extraData: json("extra_data"),
  },
  (table) => {
    return {
      resourceIdIdx: index("resource_id_idx").on(table.resourceId),
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

    accountId: bigint("account_id", { mode: "bigint" }).notNull(),
    currencyId: bigint("currency_id", { mode: "bigint" }).notNull(),

    amount: float("amount").notNull(),
    date: timestamp("date").notNull(),
    type: mysqlEnum("type", [
      BalanceType.AVAILABLE,
      BalanceType.BOOKED,
      BalanceType.EXPECTED,
    ]).notNull(),
    extraData: json("extra_data"),
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
 * - balance <-> currency     -> 1-to-1
 */
export const balanceRelations = relations(balance, ({ one }) => ({
  account: one(account, {
    fields: [balance.accountId],
    references: [account.id],
  }),
  currency: one(currency, {
    fields: [balance.currencyId],
    references: [currency.id],
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

    accountId: bigint("account_id", { mode: "bigint" }).notNull(),
    categoryId: bigint("category_id", { mode: "bigint" }).notNull(),
    currencyId: bigint("currency_id", { mode: "bigint" }).notNull(),

    amount: float("amount").notNull(),
    date: timestamp("date").notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    extraData: json("extra_data"),
  },
  (table) => {
    return {
      accountIdIdx: index("account_id_idx").on(table.accountId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that transaction is related to:
 * - transaction <-> account  -> 1-to-1
 * - transaction <-> category -> 1-to-1
 * - transaction <-> currency -> 1-to-1
 */
export const transactionRelations = relations(transaction, ({ one }) => ({
  account: one(account, {
    fields: [transaction.accountId],
    references: [account.id],
  }),
  category: one(category, {
    fields: [transaction.categoryId],
    references: [category.id],
  }),
  currency: one(currency, {
    fields: [transaction.currencyId],
    references: [currency.id],
  }),
}));
