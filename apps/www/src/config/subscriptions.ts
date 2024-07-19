import type { SubscriptionPlan } from "@/types";
import { env } from "@/env";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For Beginners",
    benefits: [
      "Up to 3 listings",
      "Basic analytics and reporting",
      "Access to standard templates",
    ],
    limitations: [
      "No priority access to new features.",
      "Limited customer support",
      "No custom branding",
      "Limited access to business resources.",
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: "Pro",
    description: "Unlock Advanced Features",
    benefits: [
      "Up to 20 monthly listings",
      "Advanced analytics and reporting",
      "Access to business templates",
      "Priority customer support",
      "Exclusive webinars and training.",
    ],
    limitations: [
      "No custom branding",
      "Limited access to business resources.",
    ],
    prices: {
      monthly: 40,
      yearly: 384,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Business",
    description: "For Power Users",
    benefits: [
      "Unlimited posts",
      "Real-time analytics and reporting",
      "Access to all templates, including custom branding",
      "24/7 business customer support",
      "Personalized onboarding and account management.",
    ],
    limitations: [],
    prices: {
      monthly: 60,
      yearly: 576,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];
