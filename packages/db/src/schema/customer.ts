import { sql } from "drizzle-orm";
import { index, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { SubscriptionPlan } from "../enum";
import { pgTable } from "./_table";

export const planEnum = pgEnum("plan", [
  SubscriptionPlan.FREE,
  SubscriptionPlan.STANDARD,
  SubscriptionPlan.PRO,
]);

export const customer = pgTable(
  "customer",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    stripeId: varchar("stripe_id", { length: 36 }).notNull().unique(),
    subscriptionId: varchar("subscription_id", { length: 36 }),
    userId: varchar("user_id", { length: 36 }).notNull(),
    orgId: varchar("org_id", { length: 36 }),

    name: varchar("name", { length: 256 }),
    plan: planEnum("plan"),
    paidUntil: timestamp("paid_until"),
    endsAt: timestamp("ends_at"),
  },
  (table) => {
    return {
      userIdIdx: index().on(table.userId),
      orgIdIdx: index().on(table.orgId),
    };
  },
);
