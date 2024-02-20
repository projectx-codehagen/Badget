import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { customAlphabet } from "nanoid";

import * as account from "./schema/account";
import * as category from "./schema/category";
import * as customer from "./schema/customer";
import * as openbanking from "./schema/openbanking";
import * as project from "./schema/project";
import * as resource from "./schema/resource";
import * as transaction from "./schema/transaction";

export const schema = {
  ...customer,
  ...project,
  ...openbanking,
  ...account,
  ...resource,
  ...transaction,
  ...category,
};

export type Account = typeof schema.account.$inferSelect;
export type Balance = typeof schema.balance.$inferSelect;
export type Resource = typeof schema.resource.$inferSelect;
export type ResourceInsert = typeof schema.resource.$inferInsert;
export type Transaction = typeof schema.transaction.$inferSelect;
export type Merchant = typeof schema.merchant.$inferSelect;
export type TransactionInsert = typeof schema.transaction.$inferInsert;

export type CanonicalCountryCode = typeof schema.countryCodes.$inferSelect;
export type CanonicalConnectorConfig =
  typeof schema.connectorConfigs.$inferSelect;
export type CanonicalConnector = typeof schema.connectors.$inferSelect;
export type CanonicalIntegration = typeof schema.integrations.$inferInsert;

export { mySqlTable as tableCreator } from "./schema/_table";
export * from "./enum";

export * from "drizzle-orm";

export const db = drizzle(
  new Client({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  }).connection(),
  { schema },
);

// Use custom alphabet without special chars for less chaotic, copy-able URLs
// Will not collide for a long long time: https://zelark.github.io/nano-id-cc/
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
