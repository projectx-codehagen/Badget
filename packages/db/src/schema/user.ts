import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { UserStatus } from "../enum";
import { mySqlTable } from "./_table";
import { customer } from "./customer";

export const user = mySqlTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    clerkUserId: varchar("clerk_user_id", { length: 36 }),
    customerId: bigint("id", { mode: "number" }),
    status: mysqlEnum("status", [
      UserStatus.ACTIVE,
      UserStatus.INACTIVE,
      UserStatus.BLOCKED,
      UserStatus.BANNED,
      UserStatus.DELETED,
    ]).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
  },
  (table) => {
    return {
      clerkUserIdIdx: index("clerk_user_id_idx").on(table.clerkUserId),
    };
  },
);

export const userToCustomer = relations(user, ({ one }) => ({
  customer: one(customer, {
    fields: [user.customerId],
    references: [customer.id],
  }),
}));
