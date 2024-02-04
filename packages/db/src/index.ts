import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { customAlphabet } from "nanoid";

import * as account from "./schema/account";
import * as category from "./schema/category";
import * as customer from "./schema/customer";
import * as institution from "./schema/institution";
import * as item from "./schema/item";
import * as project from "./schema/project";
import * as transaction from "./schema/transaction";

export const schema = {
  ...customer,
  ...project,
  ...account,
  ...institution,
  ...item,
  ...transaction,
  ...category,
};

export type Account = typeof schema.account.$inferSelect;
export type Balance = typeof schema.balance.$inferSelect;
export type Item = typeof schema.item.$inferSelect;
export type ItemInsert = typeof schema.item.$inferInsert;
export type Transaction = typeof schema.transaction.$inferSelect;
export type Merchant = typeof schema.merchant.$inferSelect;
export type TransactionInsert = typeof schema.transaction.$inferInsert;

export { mySqlTable as tableCreator } from "./schema/_table";
export * from "./enum";
export * from "./queries";

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
