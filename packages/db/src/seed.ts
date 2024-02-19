import { Client } from "@planetscale/database";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import {
  connectorConfigs,
  connectors,
  integrations,
  resources,
} from "./data/mock";
import { countries, currencies } from "./data/setup";
import { schema, sql } from "./index";

dotenv.config({ path: "../../.env.local" });

if (!("DATABASE_HOST" in process.env))
  throw new Error("DATABASE_HOST not found on .env.local");
if (!("DATABASE_USERNAME" in process.env))
  throw new Error("DATABASE_USERNAME not found on .env.local");
if (!("DATABASE_PASSWORD" in process.env))
  throw new Error("DATABASE_PASSWORD not found on .env.local");

const main = async () => {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }).connection();
  const db = drizzle(client);

  console.log("Seed start");
  await db
    .insert(schema.country)
    .values(countries)
    .onDuplicateKeyUpdate({ set: { iso: sql`iso`, name: sql`name` } });
  await db
    .insert(schema.currency)
    .values(currencies)
    .onDuplicateKeyUpdate({
      set: {
        iso: sql`iso`,
        symbol: sql`symbol`,
        numericCode: sql`numeric_code`,
      },
    });
  await db
    .insert(schema.connectorConfig)
    .values(connectorConfigs)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db
    .insert(schema.connector)
    .values(connectors)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db
    .insert(schema.integration)
    .values(integrations)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db
    .insert(schema.resource)
    .values(resources)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  console.log("Seed done");
};

await main();
