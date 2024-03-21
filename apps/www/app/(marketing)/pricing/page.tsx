import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

import { env } from "@projectx/stripe/env";

import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";

export const metadata = {
  title: "Badget Pricing - Tailored Plans for Your Real Estate Needs",
  description:
    "Explore competitive pricing plans for Badget. Find the perfect package to boost your real estate listings with AI",
};

export default async function PricingPage() {
  const useStripe = env.USE_STRIPE === "true";

  let user: User | null = null;
  let subscriptionPlan: any = null;

  if (useStripe) {
    user = await currentUser();
    subscriptionPlan = await api.auth.mySubscription.query();
  }

  // const user = await currentUser();
  // const subscriptionPlan = await api.auth.mySubscription.query();

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      {useStripe && (
        <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
      )}
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
