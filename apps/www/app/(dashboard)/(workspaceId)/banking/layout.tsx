import { AddButton } from "@/components/buttons/AddButton";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";
import type { NavItem } from "@/app/config";

import { DashboardShell } from "../../_components/dashboard-shell";

const breadcrumbItems = [
  { title: "Overview", href: "" },
  { title: "Accounts", href: "accounts" },
  { title: "Transactions", href: "transactions" },
  { title: "Categories", href: "categories" },
  { title: "Recurring", href: "recurring" },
] satisfies NavItem[];

export default function WorkspaceLayout(props: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <>
      <DashboardShell
        breadcrumbItems={breadcrumbItems}
        title="Banking"
        description="Projects for this workspace will show up here"
        headerAction={
          <AddButton triggerLabel="Add Asset">
            <AddAssetFlow />
          </AddButton>
        }
      >
        {props.children}
      </DashboardShell>
    </>
  );
}
