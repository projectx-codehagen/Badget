"use client";

import * as React from "react";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { SankeyCard } from "./sankey-card";
import { CardsStats } from "./stats";

interface DashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function SaveMoneyDashboard({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
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
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ScrollArea className="h-screen">
            <div className="flex h-[52px] items-center px-4 py-2">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <Separator />

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form></form>
            </div>
            <SankeyCard />
            <CardsStats />
            {/* <div className="ml-6 mt-6 flex gap-4"> */}
            <div className="mx-6 mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {/* <TransactionsReviewTable />
              <TopCategoriesTable /> */}
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
