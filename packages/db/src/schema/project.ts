import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  json,
  mysqlEnum,
  primaryKey,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { ProjectTier } from "../enum";
import { mySqlTable } from "./_table";
import { account } from "./account";

export const project = mySqlTable(
  "project",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    clerkOrganizationId: varchar("clerk_organization_id", { length: 36 }),
    clerkUserId: varchar("user_id", { length: 36 }),

    name: varchar("name", { length: 128 }).notNull(),
    tier: mysqlEnum("tier", [ProjectTier.FREE, ProjectTier.PRO])
      .default(ProjectTier.FREE)
      .notNull(),
    url: varchar("url", { length: 255 }),
  },
  (table) => {
    return {
      clerkOrganizationIdIdx: index("clerk_organization_id_idx").on(
        table.clerkOrganizationId,
      ),
      clerkUserIdIdx: uniqueIndex("clerk_user_id_idx").on(table.clerkUserId),
    };
  },
);

export const apiKey = mySqlTable(
  "apiKey",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    clerkUserId: varchar("clerk_user_id", { length: 36 }).notNull(),
    projectId: bigint("project_id", { mode: "number" }).notNull(),

    expiresAt: timestamp("expires_at"),
    lastUsed: timestamp("last_used"),
    revokedAt: timestamp("revoked_at"),
    name: varchar("name", { length: 256 }).default("Secret Key"),
    key: varchar("key", { length: 256 }).unique().notNull(),
  },
  (table) => {
    return {
      clerkUserIdIdx: uniqueIndex("clerk_user_id_idx").on(table.clerkUserId),
      projectIdIdx: index("project_id_idx").on(table.projectId),
    };
  },
);

export const ingestion = mySqlTable(
  "ingestion",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    projectId: int("project_id").notNull(),
    apiKeyId: int("api_key_id").notNull(),

    schema: json("schema"),
    hash: varchar("hash", { length: 40 }).notNull(), // sha1
    parent: varchar("parent", { length: 40 }), // sha1
    origin: varchar("url", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      projectIdIdx: index("project_id_idx").on(table.projectId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that project is related to:
 * - project <-> apiKey     -> 1-to-1
 * - project <-> ingestion  -> 1-to-1
 * - project <-> account    -> N-to-N
 */
export const projectRelations = relations(project, ({ one, many }) => ({
  apiKey: one(apiKey),
  ingestion: one(ingestion),
  projectsToAccounts: many(account),
}));

// 👇 This code block defines which columns in the two tables are related
export const apiKeyRelations = relations(apiKey, ({ one }) => ({
  project: one(project, {
    fields: [apiKey.projectId],
    references: [project.id],
  }),
}));

// 👇 This code block defines which columns in the two tables are related
export const ingestionRelations = relations(ingestion, ({ one }) => ({
  project: one(project, {
    fields: [ingestion.projectId],
    references: [project.id],
  }),
}));

export const projectsToAccounts = mySqlTable(
  "projects_to_accounts",
  {
    projectId: int("project_id").notNull(),
    accountId: int("account_id").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.projectId, t.accountId),
  }),
);

// 👇 This code block defines which columns in the two tables are related
export const projectsToAccountsRelations = relations(
  projectsToAccounts,
  ({ one }) => ({
    account: one(account, {
      fields: [projectsToAccounts.accountId],
      references: [account.id],
    }),
    project: one(project, {
      fields: [projectsToAccounts.projectId],
      references: [project.id],
    }),
  }),
);
