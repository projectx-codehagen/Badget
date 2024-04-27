import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { customAlphabet } from "nanoid";

import * as asset from "./schema/asset";
import * as countryCode from "./schema/country";
import * as currency from "./schema/currency";
import * as customer from "./schema/customer";
import * as openbanking from "./schema/openbanking";
import * as provider from "./schema/provider";

export const schema = {
  ...countryCode,
  ...currency,
  ...customer,
  ...provider,
  ...provider,
  ...openbanking,
  ...asset,
};

export type CanonicalResource = typeof schema.resource.$inferSelect;
export type CanonicalCountry = typeof schema.country.$inferInsert;
export type CanonicalCurrency = typeof schema.currency.$inferInsert;
export type CanonicalConnectorConfig =
  typeof schema.connectorConfig.$inferSelect;
export type CanonicalConnector = typeof schema.connector.$inferSelect;
export type CanonicalIntegration = typeof schema.integration.$inferInsert;
export type CanonicalAccount = typeof schema.account.$inferInsert;
export type CanonicalBalance = typeof schema.balance.$inferInsert;
export type CanonicalTransaction = typeof schema.transaction.$inferInsert;

export { pgTable as tableCreator } from "./schema/_table";
export * from "./enum";

export * from "drizzle-orm";

import { env } from "../../../apps/www/env";

export const db = drizzle(
  neon(env.NEXT_PUBLIC_DATABASE_URL!),
);

// Use custom alphabet without special chars for less chaotic, copy-able URLs
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
