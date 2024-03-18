import { Stripe } from "stripe";

import { env } from "./env.mjs";

export * from "./plans";
export * from "./webhooks";

export type { Stripe };

let stripe: Stripe | undefined;

const useStripe = env.USE_STRIPE === "true";

if (useStripe && env.STRIPE_API_KEY) {
  stripe = new Stripe(env.STRIPE_API_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
  });
} else {
  console.log("Stripe integration is disabled or not properly configured.");
}

export { stripe };
