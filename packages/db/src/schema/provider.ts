import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  json,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { ConnectorEnv, ConnectorStatus, ConnectorType } from "../enum";
import { mySqlTable } from "./_table";
import { country } from "./country";
import { account } from "./openbanking";

export const connectorConfig = mySqlTable(
  "connectorConfig",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    orgId: varchar("org_id", { length: 36 }).notNull(),
    secret: json("secret"),
    env: mysqlEnum("env", [
      ConnectorEnv.DEVELOPMENT,
      ConnectorEnv.SANDBOX,
      ConnectorEnv.PRODUCTION,
    ]).notNull(),

    connectorId: bigint("connector_id", { mode: "bigint" }),
  },
  (table) => {
    return {
      orgIdIdx: index("org_id_idx").on(table.orgId),
    };
  },
);

export const connector = mySqlTable("connector", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  name: varchar("name", { length: 36 }).notNull(), // TODO: maybe use enum ?
  logoUrl: varchar("logo_url", { length: 255 }),
  status: mysqlEnum("status", [
    ConnectorStatus.ACTIVE,
    ConnectorStatus.BETA,
    ConnectorStatus.DEV,
    ConnectorStatus.INACTIVE,
  ]).notNull(),
  type: mysqlEnum("type", [
    ConnectorType.DIRECT,
    ConnectorType.AGGREGATED,
  ]).notNull(),
});

export const integration = mySqlTable(
  "integration",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    name: varchar("name", { length: 255 }).notNull(),
    logoUrl: varchar("logo_url", { length: 255 }),
    connectorProviderId: varchar("connector_provider_id", {
      length: 127,
    }).unique(),

    connectorId: bigint("connector_id", { mode: "bigint" }).notNull(),
  },
  (table) => {
    return {
      connectorIdIdx: index("connector_id_idx").on(table.connectorId),
    };
  },
);

export const resource = mySqlTable(
  "resource",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    // TODO: add fields
    integrationId: bigint("integration_id", { mode: "bigint" }).notNull(),
    originalId: varchar("original_id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (table) => {
    return {
      integrationIdIdx: index("integration_id_idx").on(table.integrationId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that connector is related to:
 * - connector <-> connectorConfig  -> 1-to-N
 * - connector <-> integration      -> 1-to-N
 */
export const connectorsRelations = relations(connector, ({ many }) => ({
  connectorConfigs: many(connectorConfig),
  integrations: many(integration),
}));

/**
 * 👇 This code block will tell Drizzle that integration is related to:
 * - integration <-> connector -> N-to-1
 * - integration <-> provider  -> N-to-1
 */
export const integrationsRelations = relations(
  integration,
  ({ one, many }) => ({
    connector: one(connector, {
      fields: [integration.connectorId],
      references: [connector.id],
    }),
    countries: many(country),
  }),
);

/**
 * 👇 This code block will tell Drizzle that resource is related to:
 * - resource <-> integration -> 1-to-1
 * - resource <-> account     -> 1-to-N
 */
export const resourcesRelations = relations(resource, ({ many, one }) => ({
  integration: one(integration, {
    fields: [resource.integrationId],
    references: [integration.id],
  }),
  accounts: many(account),
}));
