import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  json,
  mysqlEnum,
  timestamp,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { ConnectorEnv, ConnectorStatus, ConnectorType } from "../enum";
import { mySqlTable } from "./_table";
import { country } from "./country";
import { account } from "./openbanking";

export const connectorConfigs = mySqlTable(
  "connectorConfigs",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
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

export const integrations = mySqlTable(
  "integrations",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    name: varchar("name", { length: 255 }).notNull(),
    logoUrl: varchar("logo_url", { length: 255 }),
    connectorProviderId: varchar("connector_provider_id", {
      length: 63,
    }).unique(),

    connectorId: bigint("connector_id", { mode: "number" }),
  },
  (table) => {
    return {
      connectorIdNameUnq: unique().on(table.connectorId, table.name),
      connectorIdIdx: index("connector_id_idx").on(table.connectorId),
    };
  },
);

export const resource = mySqlTable(
  "resource",
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

// export const session = mySqlTable(
//   "session",
//   {
//     id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at").onUpdateNow(),

//     // TODO: add fields
//     userId: varchar("user_id", { length: 36 }).notNull(),
//     integrationId: bigint("integration_id", { mode: "bigint" }),
//   },
//   (table) => {
//     return {
//       integrationIdIdx: index("integration_id_idx").on(table.integrationId),
//     };
//   },
// );

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
 * 👇 This code block will tell Drizzle that integration is related to:
 * - integration <-> connector -> N-to-1
 * - integration <-> provider  -> N-to-1
 */
export const integrationsRelations = relations(
  integrations,
  ({ one, many }) => ({
    connector: one(connectors, {
      fields: [integrations.connectorId],
      references: [connectors.id],
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
  integration: one(integrations, {
    fields: [resource.integrationId],
    references: [integrations.id],
  }),
  accounts: many(account),
}));
