import type { Stripe } from "stripe";

import { initializeStripe, stripe } from ".";
import { env } from "./env.mjs";

type StripeCallback<T> = (stripe: Stripe) => Promise<T>;

export const isStripeEnabled = (): boolean => env.USE_STRIPE === "true";

export const withStripe = async <T>(
  callback: StripeCallback<T>,
): Promise<T | null> => {
  if (!isStripeEnabled()) {
    console.warn("Stripe is disabled.");
    return null;
  }

  const stripe = initializeStripe();
  if (!stripe) {
    console.warn("Stripe is not properly configured.");
    return null;
  }

  try {
    return await callback(stripe);
  } catch (error) {
    console.error("Stripe operation failed:", error);
    throw error;
  }
};
