import type { Dinero } from "dinero.js";

import { SubscriptionPlan } from "@projectx/db";

import { env } from "./env.mjs";
import { isStripeEnabled } from "./utils";

export interface ExtendedPlanInfo extends PlanInfo {
  price: Dinero<number>;
}

export type PlansResponse = ExtendedPlanInfo[];

export interface PlanInfo {
  key: SubscriptionPlan;
  name: string;
  description: string;
  preFeatures?: string;
  features: string[];
  priceId: string;
}

export const PLANS: Record<SubscriptionPlan, PlanInfo | undefined> = {
  STANDARD: isStripeEnabled()
    ? {
        key: SubscriptionPlan.STANDARD,
        name: "Standard",
        description: "For individuals",
        features: ["Invite up to 1 team member", "Lorem ipsum dolor sit amet"],
        priceId:
          env.NEXT_PUBLIC_STRIPE_STD_MONTHLY_PRICE_ID ?? "no-id-necessary",
      }
    : undefined,
  PRO: isStripeEnabled()
    ? {
        key: SubscriptionPlan.PRO,
        name: "Pro",
        description: "For teams",
        preFeatures: "Everything in standard, plus",
        features: ["Invite up to 5 team members", "Unlimited projects"],
        priceId:
          env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID ?? "no-id-necessary",
      }
    : undefined,
  FREE: {
    key: SubscriptionPlan.FREE,
    name: "Free",
    description: "For individuals",
    features: ["Invite up to 1 team member", "Lorem ipsum dolor sit amet"],
    priceId: "no-id-necessary",
  },
};

export function stripePriceToSubscriptionPlan(priceId: string | undefined) {
  return Object.values(PLANS).find((plan) => plan?.priceId === priceId);
}
