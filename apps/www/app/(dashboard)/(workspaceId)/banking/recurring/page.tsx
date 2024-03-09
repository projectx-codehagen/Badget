import { cookies } from "next/headers";

import {
  accounts,
  mails,
} from "@/app/(dashboard)/(workspaceId)/investment/data";

import { RecurringDashboard } from "./_components/categories-dashboard";

export const metadata = {
  title: "Transactions",
  description: "Transactions description",
};

export default async function DashboardPage() {
  const layout = cookies().get("react-resizable-panels:layout-recurring");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="flex flex-col">
        <RecurringDashboard
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
