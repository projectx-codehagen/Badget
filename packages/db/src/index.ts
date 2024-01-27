import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as auth from "./schema/auth";
import * as customer from "./schema/customer";

export const schema = { ...auth, ...customer };

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
export * from "./enum";

const connection = connect({
  host: process.env.DB_HOST!,
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
});

export const db = drizzle(connection, { schema });
