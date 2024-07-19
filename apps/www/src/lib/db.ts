/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { env } from "@/env";
import { Pool, PrismaClient, PrismaNeon } from "@dingify/db";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const pool = new Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter,
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
