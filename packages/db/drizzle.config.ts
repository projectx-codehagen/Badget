import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: "../../.env.local" });

const uri = [
  "mysql://",
  process.env.DATABASE_USERNAME,
  ":",
  process.env.DATABASE_PASSWORD,
  "@",
  process.env.DATABASE_HOST,
  ":3306/",
  process.env.DATABASE_NAME,
  '?ssl={"rejectUnauthorized":true}',
].join("");

export default {
  schema: "./src/schema",
  driver: "mysql2",
  dbCredentials: { uri },
  tablesFilter: ["projectx_*"],
} satisfies Config;
