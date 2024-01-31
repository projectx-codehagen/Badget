import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  json,
  mysqlEnum,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

import { PlaidProducts } from "../enum";
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
    products: mysqlEnum("products", [
      PlaidProducts.Assets,
      PlaidProducts.Auth,
      PlaidProducts.Balance,
      // PlaidProducts.Identity,
      // PlaidProducts.Investments,
      // PlaidProducts.InvestmentsAuth,
      // PlaidProducts.Liabilities,
      // PlaidProducts.PaymentInitiation,
      // PlaidProducts.IdentityVerification,
      PlaidProducts.Transactions,
      // PlaidProducts.CreditDetails,
      // PlaidProducts.Income,
      // PlaidProducts.IncomeVerification,
      // PlaidProducts.DepositSwitch,
      // PlaidProducts.StandingOrders,
      // PlaidProducts.Transfer,
      // PlaidProducts.Employment,
      PlaidProducts.RecurringTransactions,
      // PlaidProducts.Signal,
      // PlaidProducts.Statements,
    ]),
    countryCodes: json("country_codes"),
    url: varchar("url", { length: 64 }).notNull(),
    primaryColor: varchar("primary_color", { length: 64 }).notNull(),
    logo: varchar("logo", { length: 64 }).notNull(),
    routingNumbers: json("routing_numbers").notNull(),
    dtcNumbers: json("dtc_numbers").notNull(),
    oauth: tinyint("oauth").notNull(),
    status: json("status").notNull(),
    requestId: varchar("request_id", { length: 64 }).notNull(),
    total: int("total").notNull(),
  },
  (table) => {
    return {
      institutionIdIdx: index("instistution_id_idx").on(table.institutionId),
    };
  },
);
