import { DashboardHeader } from "@/apps/www/components/dashboard/header";
import { DashboardShell } from "@/apps/www/components/dashboard/shell";
import { CardSkeleton } from "@/apps/www/components/shared/card-skeleton";
import { Button } from "@/apps/www/components/ui/button";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <Button>Fake button</Button>
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
