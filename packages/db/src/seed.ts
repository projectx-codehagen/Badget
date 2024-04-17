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
  await db.insert(schema.country).values(countries);
  // .onDuplicateKeyUpdate({ set: { iso: sql`iso`, name: sql`name` } });
  await db.insert(schema.currency).values(currencies);
  // .onDuplicateKeyUpdate({
  //   set: {
  //     iso: sql`iso`,
  //     symbol: sql`symbol`,
  //     numericCode: sql`numeric_code`,
  //   },
  // });
  await db.insert(schema.connectorConfig).values(connectorConfigs);
  // .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db.insert(schema.connector).values(connectors);
  // .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db.insert(schema.integration).values(integrations);
  // .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db.insert(schema.resource).values(resources);
  // .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  console.log("Seed done");
};

await main();
