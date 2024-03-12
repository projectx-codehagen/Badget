import React from "react";

import { AddAssetButton } from "@/components/buttons/AddAssetButton";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";

import { DashboardShell } from "../../_components/dashboard-shell";

export default function WorkspaceLayout(props: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  return (
    <>
      <DashboardShell
        title="Dashboard"
        description="Projects for this workspace will show up here"
        headerAction={
          <AddAssetButton triggerLabel="Add Asset">
            <AddAssetFlow />
          </AddAssetButton>
        }
      >
        {props.children}
      </DashboardShell>
    </>
  );
}
