import { redirect } from "next/navigation";
import { DashboardHeader } from "@/apps/www/components/dashboard/header";
import { DashboardShell } from "@/apps/www/components/dashboard/shell";
import { EmptyPlaceholder } from "@/apps/www/components/shared/empty-placeholder";
import { Button } from "@/apps/www/components/ui/button";
import { authOptions } from "@/apps/www/lib/auth";
import { getCurrentUser } from "@/apps/www/lib/session";

export const metadata = {
  title: "Dasboard",
  description: "Dashboard description",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Properties" text="Create and manage content.">
        <Button>Fake button</Button>
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any content yet. Start creating content.
          </EmptyPlaceholder.Description>
          <Button variant="outline">Fake button</Button>
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );
}
