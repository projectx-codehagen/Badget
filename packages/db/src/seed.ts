import { Client } from "@planetscale/database";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import {
  CanonicalConnector,
  CanonicalConnectorConfig,
  CanonicalCountryCode,
  ConnectorType,
  schema,
  sql,
} from "./index";

dotenv.config({ path: "../../.env.local" });

if (!("DATABASE_HOST" in process.env))
  throw new Error("DATABASE_HOST not found on .env.local");
if (!("DATABASE_USERNAME" in process.env))
  throw new Error("DATABASE_USERNAME not found on .env.local");
if (!("DATABASE_PASSWORD" in process.env))
  throw new Error("DATABASE_PASSWORD not found on .env.local");
if (!("PLAID_CLIENT_ID" in process.env))
  throw new Error("PLAID_CLIENT_ID not found on .env.local");
if (!("PLAID_CLIENT_SECRET" in process.env))
  throw new Error("PLAID_CLIENT_SECRET not found on .env.local");

const main = async () => {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }).connection();
  const db = drizzle(client);

  const countryCodeData: CanonicalCountryCode[] = [];
  const connectorsConfigData: CanonicalConnectorConfig[] = [];
  const connectorsData: CanonicalConnector[] = [];

  countryCodeData.push({
    id: 1,
    code: "IT",
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    integrationId: BigInt(1), // NOTE: why is this required?
  });

  connectorsConfigData.push({
    id: 1,
    env: "SANDBOX",
    secret: {
      clientId: process.env.PLAID_CLIENT_ID!,
      clientSecret: process.env.PLAID_CLIENT_SECRET!,
    },
    orgId: "org_",
    connectorId: BigInt(1),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  connectorsData.push({
    id: 1,
    name: "plaid",
    type: ConnectorType.AGGREGATED,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Seed start");
  await db
    .insert(schema.countryCodes)
    .values(countryCodeData)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db
    .insert(schema.connectorConfigs)
    .values(connectorsConfigData)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db
    .insert(schema.connectors)
    .values(connectorsData)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  console.log("Seed done");
};

await main();
