import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { customAlphabet } from "nanoid";

import * as customer from "./schema/customer";

export const schema = { ...customer };

export { mySqlTable as tableCreator } from "./schema/_table";

export type Customer = typeof schema.customer.$inferSelect;

export * from "drizzle-orm";
export * from "./enum";

const connection = connect({
  host: process.env.DB_HOST!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(connection, { schema });

// Use custom alphabet without special chars for less chaotic, copy-able URLs
// Will not collide for a long long time: https://zelark.github.io/nano-id-cc/
export const genId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16);
