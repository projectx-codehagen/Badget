import { redirect } from "next/navigation";
import { DashboardHeader } from "@/apps/www/components/dashboard/header";
import { DashboardShell } from "@/apps/www/components/dashboard/shell";
import { UserNameForm } from "@/apps/www/components/forms/user-name-form";
import { authOptions } from "@/apps/www/lib/auth";
import { getCurrentUser } from "@/apps/www/lib/session";

export const metadata = {
  title: "Projectx Settings - Customize Your Experience",
  description:
    "Adjust your Projectx account settings for a tailored real estate management experience. Manage language preferences, account details, and more.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const handleUpdateUser = async (data) => {
    // ... logic to update the user
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  );
}
