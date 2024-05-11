import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: "../../.env.local" });

const uri = process.env.DATABASE_URL || "";

if (!uri) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: {
    connectionString: uri,
  },
  tablesFilter: ["projectx_*"],
} satisfies Config;
