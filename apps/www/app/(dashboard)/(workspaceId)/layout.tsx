// import { SyncActiveOrgFromUrl } from "./sync-active-org-from-url";
import { cookies } from "next/headers";

import { Dashboard } from "./dashboard/_components/dashboard-1";

export default function WorkspaceLayout(props: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      {/* TODO: Nuke it when we can do it serverside in Clerk! */}
      {/* <SyncActiveOrgFromUrl /> */}
      <Dashboard
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      >
        {props.children}
      </Dashboard>
    </>
  );
}
