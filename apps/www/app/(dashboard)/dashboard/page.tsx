import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserWorkspaces } from "@/actions/account-switcher/get-workspace";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { isValidJSONString } from "@/lib/utils";
import { Dashboard } from "@/components/new-dashboard/components/dashboard-1";
import { accounts, mails } from "@/components/new-dashboard/data";

export const metadata = {
  title: "Dasboard",
  description: "Dashboard description",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const workspace = await getUserWorkspaces();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="flex flex-col">
        <Dashboard
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
          workspace={workspace}
        />
      </div>
    </>
  );
}
