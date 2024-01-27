import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";

export const metadata = {
  title: "Projectx Pricing - Tailored Plans for Your Real Estate Needs",
  description:
    "Explore competitive pricing plans for Projectx. Find the perfect package to boost your real estate listings with AI",
};

export default async function PricingPage() {
  const user = await currentUser();
  const subscriptionPlan = await api.auth.mySubscription.query();

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
