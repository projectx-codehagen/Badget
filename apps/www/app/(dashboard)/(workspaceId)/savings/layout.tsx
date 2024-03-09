import { NavItem } from "@/app/config";

import { DashboardShell } from "../../_components/dashboard-shell";

const breadcrumbItems = [
  { title: "Overview", href: "" },
  { title: "Pension Funds", href: "pension-fund" },
  { title: "Deposit Accounts", href: "deposit-account" },
  { title: "Piggy Banks", href: "piggy-banks" },
] satisfies NavItem[];

export default function WorkspaceLayout(props: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <>
      <DashboardShell
        breadcrumbItems={breadcrumbItems}
        title="Savings"
        description="Projects for this workspace will show up here"
        // headerAction={
        //   <AddAssetButton triggerLabel="Add Asset">
        //     <AddAssetFlow />
        //   </AddAssetButton>
        // }
      >
        {props.children}
      </DashboardShell>
    </>
  );
}
