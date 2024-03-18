import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    DATABASE_HOST: z.string().min(1),
    DATABASE_USERNAME: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1).optional(),
    STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_STD_PRODUCT_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_STRIPE_STD_MONTHLY_PRICE_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_STRIPE_PRO_PRODUCT_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID: z.string().min(1).optional(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    VERCEL_ENV: process.env.VERCEL_ENV,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_STD_PRODUCT_ID:
      process.env.NEXT_PUBLIC_STRIPE_STD_PRODUCT_ID,
    NEXT_PUBLIC_STRIPE_STD_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_STD_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_PRO_PRODUCT_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_PRODUCT_ID,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
