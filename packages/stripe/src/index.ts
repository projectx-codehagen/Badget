import { Stripe } from "stripe";

export * from "./plans";
export * from "./webhooks";

export type { Stripe };

export const stripe = new Stripe(
  "", // INFO: Later we'll use env.STRIPE_API_KEY, 
  {
  apiVersion: "2023-10-16",
  typescript: true,
});
