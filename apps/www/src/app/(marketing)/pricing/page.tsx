import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";

import { Skeleton } from "@dingify/ui/components/skeleton";

export const metadata = {
  title: "Dingify Pricing - Tailored Plans for Your Monitoring Needs",
  description:
    "Explore competitive pricing plans for Dingify. Find the perfect package to enhance your real-time monitoring, event tracking, and data analytics.",
};

export default async function PricingPage() {
  const user = await getCurrentUser();
  let subscriptionPlan;

  if (user) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
