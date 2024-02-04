import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  json,
  mysqlEnum,
  timestamp,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { ConnectorEnv, ConnectorType } from "../enum";
import { mySqlTable } from "./_table";

export const connectorConfigs = mySqlTable(
  "connectorConfigs",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    orgId: varchar("org_id", { length: 36 }).notNull(),
    clientId: varchar("client_id", { length: 255 }),
    clientSecret: varchar("client_secret", { length: 255 }),
    env: mysqlEnum("env", [ConnectorEnv.STAGING, ConnectorEnv.PRODUCTION]),
  },
  (table) => {
    return {
      orgIdIdx: uniqueIndex("org_id_idx").on(table.orgId),
    };
  },
);

export const connectors = mySqlTable("connectors", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  type: mysqlEnum("type", [
    ConnectorType.DIRECT,
    ConnectorType.AGGREGATED,
  ]).notNull(),
});

export const providers = mySqlTable("providers", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),

  name: varchar("label", { length: 36 }).notNull(),
});

export const integrations = mySqlTable(
  "integrations",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    label: varchar("label", { length: 36 }).notNull(),
    logoUrl: varchar("logo_url", { length: 255 }),
    supportedCountries: json("supported_countryes").default([]), // TODO: table for supported features by country?

    connectorId: bigint("connector_id", { mode: "bigint" }),
    providerId: bigint("provider_id", { mode: "bigint" }),
  },
  (table) => {
    return {
      connectorProviderUnq: unique().on(table.connectorId, table.providerId),
      connectorIdIdx: index("connector_id_idx").on(table.connectorId),
      providerIdIdx: index("provider_id_idx").on(table.providerId),
    };
  },
);

export const resources = mySqlTable(
  "resources",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    // TODO: add fields
    userId: varchar("user_id", { length: 36 }).notNull(),

    integrationId: bigint("integration_id", { mode: "bigint" }),
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
export const connectorsRelations = relations(connectors, ({ many }) => ({
  connectorConfigs: many(connectorConfigs),
  integrations: many(integrations),
}));

/**
 * 👇 This code block will tell Drizzle that provider is related to:
 * - provider <-> integration -> 1-to-N
 */
export const providersRelations = relations(providers, ({ many }) => ({
  integrations: many(integrations),
}));

/**
 * 👇 This code block will tell Drizzle that integration is related to:
 * - integration <-> connector -> N-to-1
 * - integration <-> provider  -> N-to-1
 */
export const integrationsRelations = relations(integrations, ({ one }) => ({
  connector: one(connectors, {
    fields: [integrations.connectorId],
    references: [connectors.id],
  }),
  provider: one(providers, {
    fields: [integrations.providerId],
    references: [providers.id],
  }),
}));

/**
 * 👇 This code block will tell Drizzle that resource is related to:
 * - resource <-> integration -> 1-to-1
 */
export const resourcesRelations = relations(resources, ({ one }) => ({
  integration: one(integrations, {
    fields: [resources.integrationId],
    references: [integrations.id],
  }),
}));
