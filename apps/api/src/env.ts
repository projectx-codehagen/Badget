/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { z } from "zod";

export const zEnv = z.object({
	DATABASE_URL: z.string(),
	ENVIRONMENT: z
		.enum(["development", "preview", "production"])
		.default("development"),
});

export type Env = z.infer<typeof zEnv>;
