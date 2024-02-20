import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

import { BillingInfo } from "@/components/billing-info";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

export const metadata = {
  title: "Badget Billing - Subscription Management",
  description:
    "Access and manage your billing information, view subscription plans, and update payment methods on Badget's Billing page.",
};

export default async function BillingPage() {
  const user = await currentUser();
  const subscriptionPlan = await api.auth.mySubscription.query();

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
        <BillingInfo subscriptionPlan={subscriptionPlan!} />
      </div>
      {/* <LanugageButton userId={user.id} /> */}
    </DashboardShell>
  );
}
