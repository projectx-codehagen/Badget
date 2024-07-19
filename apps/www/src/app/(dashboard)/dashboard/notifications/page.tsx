import { redirect } from "next/navigation";
import { getMetricsForUser } from "@/actions/get-metrics-user";
import { getNotificationSettings } from "@/actions/get-notification-settings";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { LanguageForm2 } from "@/components/forms/language-form2";
import { UserNameForm } from "@/components/forms/user-name-form";
import { NotificationAlert } from "@/components/notifications/NotificationAlert";

export const metadata = {
  title: "Dingify Notifications - Customize Your Alerts",
  description:
    "Adjust your Dingify notification settings for a personalized real-time monitoring experience. Manage alert preferences, notification channels, and more.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }
  // How to get the metrics for the user
  const metrics = await getMetricsForUser();
  const settings = await getNotificationSettings();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Notifications"
        text="Overview of all your notification channels"
      />
      <NotificationAlert initialSettings={settings} />
    </DashboardShell>
  );
}
