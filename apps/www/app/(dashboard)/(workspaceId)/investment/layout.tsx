import { NavItem } from "@/app/config";

import { DashboardShell } from "../../_components/dashboard-shell";

const breadcrumbItems = [
  { title: "Overview", href: "" },
  { title: "Stocks", href: "stocks" },
  { title: "Crypto", href: "crypto" },
  { title: "Commodities", href: "commodities" },
] satisfies NavItem[];

export default function WorkspaceLayout(props: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <>
      <DashboardShell
        breadcrumbItems={breadcrumbItems}
        title="Investments"
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
