"use client";

import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopCategoriesTable } from "@/app/(dashboard)/(workspaceId)/dashboard/_components/top-categories-table";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { AccountsDisplay } from "./accounts-display";
import { AllocationTable } from "./allocation-table";
import { HoldingsTable } from "./holdings-table";
import { Investmentcards } from "./investment-cards";
import { SmallInvestmentCard } from "./small-investment-card";
import { TotalBalanceCard } from "./total-balance-card";

interface MailProps {
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

export function InvestmentsDashboard({
  accounts,
  mails,
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout-investment=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel
          className="!overflow-y-scroll"
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <TotalBalanceCard />
          <div className="overflow-auto">
            <SmallInvestmentCard />
            <AllocationTable />
            <HoldingsTable />
          </div>
          <div>
            <Investmentcards items={mails} />
          </div>
          <div className="p-4">
            <TopCategoriesTable />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <AccountsDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
