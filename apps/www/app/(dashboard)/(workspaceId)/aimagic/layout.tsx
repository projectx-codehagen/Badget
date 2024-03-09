import { NavItem } from "@/app/config";

import { DashboardShell } from "../../_components/dashboard-shell";

export default function WorkspaceLayout(props: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <>
      <DashboardShell
        title="AI Magic"
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
