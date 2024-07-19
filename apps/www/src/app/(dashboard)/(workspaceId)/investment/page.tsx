import { cookies } from "next/headers";

import { InvestmentsDashboard } from "./_components/investment-dashboard";
import { accounts, mails } from "./data";

export const metadata = {
  title: "Investments",
  description: "Investments description",
};

export default function InvestmentPage(_props: {
  params: { workspaceId: string };
}) {
  const layout = cookies().get("react-resizable-panels:layout-accounts");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="flex flex-col">
      <InvestmentsDashboard
        accounts={accounts}
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  );
}
