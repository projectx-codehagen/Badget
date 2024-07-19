import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { CardSkeleton } from "@/components/shared/card-skeleton";

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Notifications"
        text="Overview of all your notification channels"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
