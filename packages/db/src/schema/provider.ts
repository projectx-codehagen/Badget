import { relations, sql } from "drizzle-orm";
import { index, json, pgEnum, timestamp, varchar } from "drizzle-orm/pg-core";

import { ConnectorEnv, ConnectorStatus, ConnectorType } from "../enum";
import { pgTable } from "./_table";
import { country } from "./country";
import { account } from "./openbanking";

export const connectorEnvEnum = pgEnum("env", [
  ConnectorEnv.DEVELOPMENT,
  ConnectorEnv.SANDBOX,
  ConnectorEnv.PRODUCTION,
]);

export const connectorConfig = pgTable(
  "connectorConfig",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    orgId: varchar("org_id", { length: 36 }).notNull(),
    secret: json("secret"),
    env: connectorEnvEnum("env").notNull(),

    connectorId: varchar("connector_id", { length: 30 }),
  },
  (table) => {
    return {
      orgIdIdx: index().on(table.orgId),
    };
  },
);

export const connectorStatusEnum = pgEnum("status", [
  ConnectorStatus.ACTIVE,
  ConnectorStatus.BETA,
  ConnectorStatus.DEV,
  ConnectorStatus.INACTIVE,
]);

export const connectorTypeEnum = pgEnum("type", [
  ConnectorType.DIRECT,
  ConnectorType.AGGREGATED,
]);

export const connector = pgTable("connector", {
  id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  name: varchar("name", { length: 36 }).notNull(), // TODO: maybe use enum ?
  logoUrl: varchar("logo_url", { length: 255 }),
  status: connectorStatusEnum("status").notNull(),
  type: connectorTypeEnum("type").notNull(),
});

export const integration = pgTable(
  "integration",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    name: varchar("name", { length: 255 }).notNull(),
    logoUrl: varchar("logo_url", { length: 255 }),
    connectorProviderId: varchar("connector_provider_id", {
      length: 127,
    }).unique(),

    connectorId: varchar("connector_id", { length: 30 }).notNull(),
  },
  (table) => {
    return {
      connectorIdIdx: index().on(table.connectorId),
    };
  },
);

export const resource = pgTable(
  "resource",
  {
    id: varchar("id", { length: 30 }).primaryKey(), // prefix_ + nanoid (16)
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),

    // TODO: add fields
    integrationId: varchar("integration_id", { length: 30 }).notNull(),
    originalId: varchar("original_id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (table) => {
    return {
      integrationIdIdx: index().on(table.integrationId),
    };
  },
);

/**
 * 👇 This code block will tell Drizzle that connector is related to:
 * - connector <-> connectorConfig -> 1-to-N
 * - connector <-> integration     -> 1-to-N
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
