import { Client } from "@planetscale/database";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import {
  CanonicalConnector,
  CanonicalConnectorConfig,
  ConnectorType,
  schema,
} from "./index";

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

  const connectorsConfigData: CanonicalConnectorConfig[] = [];
  const connectorsData: CanonicalConnector[] = [];

  connectorsConfigData.push({
    id: 1,
    env: "STAGING",
    clientId: "6515a2d045d5df001cbb66aa",
    clientSecret: "d3852527c8f97ebc23934a4a6a5eb8",
    orgId: "org_",
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
  await db.insert(schema.connectorConfigs).values(connectorsConfigData);
  await db.insert(schema.connectors).values(connectorsData);
  console.log("Seed done");
};

await main();
