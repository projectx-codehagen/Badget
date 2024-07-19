import type { Env } from "../env";
import { PrismaClient, PrismaNeon, Pool } from "@dingify/db";

const pool = (env: Env) => new Pool({ connectionString: env.DATABASE_URL });
const adapter = (env: Env) => new PrismaNeon(pool(env));

const createPrismaClient = (env: Env): PrismaClient => {
	// Check if prisma client is already instantiated in global context
	const globalPrisma = globalThis as { prisma?: PrismaClient };
	const existingPrismaClient = globalPrisma.prisma;

	if (existingPrismaClient) {
		return existingPrismaClient;
	}
	const prismaClient = new PrismaClient({
		adapter: adapter(env),
		log:
			env.ENVIRONMENT === "development"
				? ["query", "error", "warn"]
				: ["error"],
		errorFormat: "pretty",
	});
	if (env.ENVIRONMENT !== "production") {
		globalPrisma.prisma = prismaClient;
	}
	return prismaClient;
};

export const prisma = (env: Env) => createPrismaClient(env);
