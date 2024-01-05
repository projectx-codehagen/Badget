import { redirect } from "next/navigation";
import { BillingInfo } from "@/apps/www/components/billing-info";
import { LanugageButton } from "@/apps/www/components/buttons/LanguageButton";
import { DashboardHeader } from "@/apps/www/components/dashboard/header";
import { DashboardShell } from "@/apps/www/components/dashboard/shell";
import { Icons } from "@/apps/www/components/shared/icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/apps/www/components/ui/alert";
import { authOptions } from "@/apps/www/lib/auth";
import { getCurrentUser } from "@/apps/www/lib/session";
import { getUserSubscriptionPlan } from "@/apps/www/lib/subscription";

export const metadata = {
  title: "Projectx Billing - Subscription Management",
  description:
    "Access and manage your billing information, view subscription plans, and update payment methods on Projectx's Billing page.",
};

export default async function BillingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-8">
        {/* <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>This is a demo app.</AlertTitle>
          <AlertDescription>
            Projectx app is a demo app using a Stripe test environment. You can
            find a list of test card numbers on the{" "}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              Stripe docs
            </a>
            .
          </AlertDescription>
        </Alert> */}
        <BillingInfo subscriptionPlan={subscriptionPlan} />
      </div>
      {/* <LanugageButton userId={user.id} /> */}
    </DashboardShell>
  );
}
