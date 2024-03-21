"use client";

import * as React from "react";
import { HelpCircle, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AddButton } from "@/components/buttons/AddButton";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";
import { WorkspaceSwitcher } from "@/app/(dashboard)/_components/workspace-switcher";
import { SidebarNav } from "@/app/(dashboard)/(workspaceId)/_components/sidebar-nav";

import { Nav } from "./nav";
import { CardsStats } from "./stats";
import { TopCategoriesTable } from "./top-categories-table";
import { TransactionsReviewTable } from "./transaction-review-table";

interface DashboardProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

export function Dashboard({
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed,
            )}`;
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out",
            "hidden lg:block"
          )}
        >
          <SidebarNav isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
