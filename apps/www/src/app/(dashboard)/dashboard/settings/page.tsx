import { redirect } from "next/navigation";
import { getMetricsForUser } from "@/actions/get-metrics-user";

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

export const metadata = {
  title: "Dingify Settings - Customize Your Experience",
  description:
    "Adjust your Dingify account settings for a personalized real-time monitoring experience. Manage language preferences, account details, and more.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn || "/login");
  }

  const metrics = await getMetricsForUser();

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="relative pb-2">
            <CardDescription>Logs</CardDescription>
            <CardTitle className="text-4xl">
              {metrics
                ? `${formatNumber(metrics.logsUsed)} / ${formatNumber(metrics.logsLimit)}`
                : "N/A"}
            </CardTitle>
            <LayersIcon className="absolute right-2 top-2 h-8 w-8" />
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Total logs for this month
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="relative pb-2">
            <CardDescription>Seats</CardDescription>
            <CardTitle className="text-4xl">
              {metrics ? `${formatNumber(metrics.seatsUsed)} / 1` : "N/A"}
            </CardTitle>
            <UsersIcon className="absolute right-2 top-2 h-8 w-8" />
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Seats used in your plan
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="relative pb-2">
            <CardDescription>Projects</CardDescription>
            <CardTitle className="text-4xl">
              {metrics ? `${formatNumber(metrics.projectsUsed)} / ∞` : "N/A"}
            </CardTitle>
            <FolderIcon className="absolute right-2 top-2 h-8 w-8" />
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Total projects in your account
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
      </div>
    </DashboardShell>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function LayersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
