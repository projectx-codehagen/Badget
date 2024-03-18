import { Stripe } from "stripe";

import { env } from "./env.mjs";

export * from "./plans";
export * from "./webhooks";
export * from "./utils";

export type { Stripe };

export const initializeStripe = (): Stripe | undefined => {
  if (env.USE_STRIPE === "true" && env.STRIPE_API_KEY) {
    return new Stripe(env.STRIPE_API_KEY, {
      apiVersion: "2023-10-16",
      typescript: true,
    });
  }
  console.log("Stripe integration is disabled or not properly configured.");
  return undefined;
};

const stripe = initializeStripe();

export { stripe };
