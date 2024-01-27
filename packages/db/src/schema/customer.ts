import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { SubscriptionPlan } from "../enum";
import { mySqlTable } from "./_table";

export const customer = mySqlTable(
  "customer",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    stripeId: varchar("stripe_id", { length: 36 }).notNull().unique(),
    subscriptionId: varchar("subscription_id", { length: 36 }),
    clerkUserId: varchar("clerk_user_id", { length: 36 }).notNull(),
    clerkOrganizationId: varchar("clerk_organization_id", { length: 36 }),

    name: varchar("name", { length: 256 }),
    plan: mysqlEnum("plan", [
      SubscriptionPlan.FREE,
      SubscriptionPlan.STANDARD,
      SubscriptionPlan.PRO,
    ]),
    paidUntil: timestamp("paid_until"),
    endsAt: timestamp("ends_at"),
  },
  (table) => {
    return {
      clerkUserIdIdx: index("clerk_user_id_idx").on(table.clerkUserId),
      clerkOrganizationIdIDX: index("clerk_organization_id_idx").on(
        table.clerkOrganizationId,
      ),
    };
  },
);
