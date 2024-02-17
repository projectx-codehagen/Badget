import { Client } from "@planetscale/database";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { getAllISOCodes } from "iso-country-currency";

import {
  CanonicalConnector,
  CanonicalConnectorConfig,
  CanonicalCountry,
  CanonicalCurrency,
  ConnectorStatus,
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

const main = async () => {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }).connection();
  const db = drizzle(client);

  const countryData: CanonicalCountry[] = [];
  const currencyData: CanonicalCurrency[] = [];
  const connectorsConfigData: CanonicalConnectorConfig[] = [];
  const connectorsData: CanonicalConnector[] = [];

  // seed country and currency
  getAllISOCodes().forEach((isoCode) => {
    countryData.push({
      active: isoCode.iso === "IT",
      iso: isoCode.iso,
      name: isoCode.countryName,
    });

    currencyData.push({
      numericCode: isoCode.numericCode,
      symbol: isoCode.symbol,
      iso: isoCode.currency,
    });
  });

  // seed connectors
  if (
    "PLAID_CLIENT_ID" in process.env &&
    "PLAID_CLIENT_SECRET" in process.env
  ) {
    connectorsConfigData.push({
      id: 1,
      env: "SANDBOX",
      secret: {
        clientId: process.env.PLAID_CLIENT_ID,
        clientSecret: process.env.PLAID_CLIENT_SECRET,
      },
      orgId: "org_",
      connectorId: BigInt(1),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    connectorsData.push({
      id: 1,
      name: "plaid",
      logoUrl:
        "https://pbs.twimg.com/profile_images/1415067514460000256/1iPIdd20_400x400.png",
      status: ConnectorStatus.ACTIVE,
      type: ConnectorType.AGGREGATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  if (
    "GOCARDLESS_SECRET_ID" in process.env &&
    "GOCARDLESS_SECRET_KEY" in process.env
  ) {
    connectorsConfigData.push({
      id: 2,
      env: "SANDBOX",
      secret: {
        secretId: process.env.GOCARDLESS_SECRET_ID,
        secretKey: process.env.GOCARDLESS_SECRET_KEY,
      },
      orgId: "org_",
      connectorId: BigInt(2),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    connectorsData.push({
      id: 2,
      name: "gocardless",
      logoUrl: "https://asset.brandfetch.io/idNfPDHpG3/idamTYtkQh.png",
      status: ConnectorStatus.ACTIVE,
      type: ConnectorType.AGGREGATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  console.log("Seed start");
  await db
    .insert(schema.country)
    .values(countryData)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } });
  await db
    .insert(schema.currency)
    .values(currencyData)
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
