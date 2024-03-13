import React from "react";

import { AddButton } from "@/components/buttons/AddButton";
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
