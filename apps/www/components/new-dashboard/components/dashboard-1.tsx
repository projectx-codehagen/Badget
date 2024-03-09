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
import { AddAssetButton } from "@/components/buttons/AddAssetButton";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";
import { MainNav } from "@/app/(dashboard)/dashboard/_components/main-nav";
import { WorkspaceSwitcher } from "@/app/(dashboard)/dashboard/_components/workspace-switcher";

import { useMail } from "../use-mail";
import { Nav } from "./nav";
import { CardsStats } from "./stats";
import { TopCategoriesTable } from "./top-categories-table";
import { TransactionsReviewTable } from "./transaction-review-table";

interface DashboardProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Dashboard({
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
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
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center px-2",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            <WorkspaceSwitcher isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
          >
            <MainNav isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Get help",
                label: "",
                icon: HelpCircle,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Settings",
                label: "",
                icon: Settings,
                variant: "ghost",
                link: "/dashboard/settings",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ScrollArea className="h-fit min-h-screen">
            <div className="flex h-[52px] items-center justify-between px-4 py-2">
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <AddAssetButton triggerLabel="Add Asset">
                  <AddAssetFlow />
                </AddAssetButton>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 p-4">
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form></form>
              </div>

              <CardsStats />
              {/* <div className="ml-6 mt-6 flex gap-4"> */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                <TransactionsReviewTable />
                <TopCategoriesTable />
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
