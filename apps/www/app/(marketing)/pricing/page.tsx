import { PricingCards } from "@/apps/www/components/pricing-cards";
import { PricingFaq } from "@/apps/www/components/pricing-faq";
import { Skeleton } from "@/apps/www/components/ui/skeleton";
import { getCurrentUser } from "@/apps/www/lib/session";
import { getUserSubscriptionPlan } from "@/apps/www/lib/subscription";

export const metadata = {
  title: "Projectx Pricing - Tailored Plans for Your Real Estate Needs",
  description:
    "Explore competitive pricing plans for Projectx. Find the perfect package to boost your real estate listings with AI",
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
