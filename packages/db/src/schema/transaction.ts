import { relations, sql } from "drizzle-orm";
import {
  bigint,
  float,
  index,
  int,
  json,
  mysqlEnum,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

import {
  PlaidMerchantConfidenceLevel,
  PlaidMerchantType,
  PlaidTransactionCode,
  PlaidTransactionPaymentChannelEnum,
} from "../enum";
import { mySqlTable } from "./_table";
import { account } from "./account";

export const transaction = mySqlTable(
  "transaction",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    accountId: bigint("account_id", { mode: "number" }).notNull(),
    plaidAccountId: varchar("plaid_account_id", { length: 38 }).notNull(),

    accountOwner: varchar("account_owner", { length: 256 }),
    amount: float("amount").notNull(),
    authorizedDate: timestamp("authorized_date"),
    authorizedDateTime: timestamp("authorized_datetime"),
    categoryId: int("category_id").notNull(),
    checkNumber: varchar("check_number", { length: 64 }),
    clerkUserId: varchar("clerk_user_id", { length: 38 }).notNull(),
    date: timestamp("date"),
    dateTime: timestamp("datetime"),
    isoCurrencyCode: varchar("iso_currency_code", { length: 3 }),
    locationId: varchar("location_id", { length: 38 }),
    logoUrl: varchar("logo_url", { length: 256 }),
    merchantEntityId: varchar("merchant_entity_id", { length: 128 }), // A unique, stable, Plaid-generated ID that maps to the merchant.
    merchantName: varchar("merchant_name", { length: 256 }),
    originalDescription: varchar("original_description", { length: 256 }),
    paymentChannel: mysqlEnum("payment_channel", [
      PlaidTransactionPaymentChannelEnum.InStore,
      PlaidTransactionPaymentChannelEnum.Online,
      PlaidTransactionPaymentChannelEnum.Other,
    ]),
    paymentMeta: json("payment_meta"),
    pending: tinyint("pending").notNull(),
    pendingTransactionId: int("pending_transaction_id"),
    personalFinanceCategory: json("personal_finance_category"),
    personalFinanceCategoryIconUrl: varchar(
      "personal_finance_category_icon_url",
      { length: 256 },
    ), // The URL of an icon associated with the primary personal finance category. The icon will always be 100×100 pixel PNG file.
    transactionCode: mysqlEnum("transaction_code", [
      PlaidTransactionCode.Adjustment,
      PlaidTransactionCode.Atm,
      PlaidTransactionCode.BankCharge,
      PlaidTransactionCode.BillPayment,
      PlaidTransactionCode.Cash,
      PlaidTransactionCode.Cashback,
      PlaidTransactionCode.Cheque,
      PlaidTransactionCode.DirectDebit,
      PlaidTransactionCode.Interest,
      PlaidTransactionCode.Null,
      PlaidTransactionCode.Purchase,
      PlaidTransactionCode.StandingOrder,
      PlaidTransactionCode.Transfer,
    ]),
    transactionId: varchar("transaction_id", { length: 256 }).notNull(),
    website: varchar("website", { length: 256 }),
    excludedAt: timestamp("excluded_at"),
  },
  (table) => {
    return {
      accountIdIdx: index("account_id_idx").on(table.accountId),
      clerkUserIdIdx: index("clerk_user_id_idx").on(table.clerkUserId),
    };
  },
);

export const location = mySqlTable(
  "location",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    address: varchar("address", { length: 256 }),
    city: varchar("city", { length: 64 }),
    region: varchar("region", { length: 64 }),
    postalCode: varchar("postal_code", { length: 10 }),
    country: varchar("country", { length: 2 }),
    lat: float("lat"),
    lon: float("lon"),
    storeNumber: int("store_number"),
  },
  (table) => {
    return {
      storeNumberIdx: index("store_number_idx").on(table.storeNumber),
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
    type: mysqlEnum("type", [
      PlaidMerchantType.Merchant,
      PlaidMerchantType.FinancialInstitution,
      PlaidMerchantType.PaymentApp,
      PlaidMerchantType.Marketplace,
      PlaidMerchantType.PaymentTerminal,
      PlaidMerchantType.IncomeSource,
    ]),
    logoUrl: varchar("logo_url", { length: 128 }),
    website: varchar("website", { length: 128 }),
    entityId: varchar("entity_id", { length: 64 }),
    confidenceLevel: mysqlEnum("confidence_level", [
      PlaidMerchantConfidenceLevel.VeryHigh,
      PlaidMerchantConfidenceLevel.High,
      PlaidMerchantConfidenceLevel.Medium,
      PlaidMerchantConfidenceLevel.Low,
      PlaidMerchantConfidenceLevel.Unknown,
    ]),
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
