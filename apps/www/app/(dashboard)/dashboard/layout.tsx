import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getUserWorkspaces } from "@/actions/account-switcher/get-workspace";

import { dashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { DashboardNav } from "@/components/layout/nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import PrimarySidebar from "@/components/new-dashboard/components/primary-sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();
  const workspace = await getUserWorkspaces();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : [250, 440, 655];
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false;

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={3.5}
          collapsible={true}
          minSize={15}
          maxSize={20}
        >
          <PrimarySidebar workspace={workspace} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <div className="flex-1">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <SiteFooter />
    </div>
  );
}
