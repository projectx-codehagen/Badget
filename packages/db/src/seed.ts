import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import {
  connectorConfigs,
  connectors,
  integrations,
  resources,
} from "./data/mock";
import { countries, currencies } from "./data/setup";
import { schema, sql } from "./index";

dotenv.config({ path: "../../.env.local" });

const uri = process.env.DATABASE_URL || "";
if (!uri) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

//TODO: Make the script working.
const main = async () => {
  const client = neon(uri);
  const db = drizzle(client);

  console.log("Seed start");

  // Log the number of unique and total entries for countries and currencies
  console.log(
    new Set(countries.map((country) => country.iso)).size,
    countries.length,
  );
  console.log(
    new Set(currencies.map((currency) => currency.iso)).size,
    currencies.length,
  );

  await db
    .insert(schema.country)
    .values(countries)
    .onConflictDoUpdate({
      target: schema.country.iso, // Assuming 'iso' is a unique column
      set: {
        iso: sql`EXCLUDED.iso`,
        name: sql`EXCLUDED.name`,
      },
    });

  await db
    .insert(schema.currency)
    .values(currencies)
    .onConflictDoUpdate({
      target: schema.currency.iso, // Assuming 'iso' is a unique column
      set: {
        iso: sql`EXCLUDED.iso`,
        symbol: sql`EXCLUDED.symbol`,
        numericCode: sql`EXCLUDED.numeric_code`,
      },
    });

  await db
    .insert(schema.connectorConfig)
    .values(connectorConfigs)
    .onConflictDoUpdate({
      target: schema.connectorConfig.id, // Assuming 'id' is the primary key
      set: {
        id: sql`EXCLUDED.id`,
      },
    });

  await db
    .insert(schema.connector)
    .values(connectors)
    .onConflictDoUpdate({
      target: schema.connector.id, // Assuming 'id' is the primary key
      set: {
        id: sql`EXCLUDED.id`,
      },
    });

  await db
    .insert(schema.integration)
    .values(integrations)
    .onConflictDoUpdate({
      target: schema.integration.id, // Assuming 'id' is the primary key
      set: {
        id: sql`EXCLUDED.id`,
      },
    });

  await db
    .insert(schema.resource)
    .values(resources)
    .onConflictDoUpdate({
      target: schema.resource.id, // Assuming 'id' is the primary key
      set: {
        id: sql`EXCLUDED.id`,
      },
    });

  console.log("Seed done");
};

await main();
