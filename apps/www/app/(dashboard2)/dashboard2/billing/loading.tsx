import { DashboardHeader } from "@/apps/www/components/dashboard/header";
import { DashboardShell } from "@/apps/www/components/dashboard/shell";
import { CardSkeleton } from "@/apps/www/components/shared/card-skeleton";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
