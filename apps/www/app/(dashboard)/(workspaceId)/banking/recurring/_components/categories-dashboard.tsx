"use client";

import * as React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RecurringTableNext } from "@/app/(dashboard)/(workspaceId)/banking/transactions/_components/allocation-table-next";
import { TopCategoriesTable } from "@/app/(dashboard)/(workspaceId)/dashboard/_components/top-categories-table";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { CategoriesTable } from "./allocation-table";
import { CategoriesDisplay } from "./categories-display";
import { Investmentcards } from "./investment-cards";
import { RecurringSpentSoFarCard } from "./total-balance-card";

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

export function RecurringDashboard({
  accounts,
  mails,
  defaultLayout = [265, 440, 400],
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
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Separator />
          <RecurringSpentSoFarCard />
          <div>
            {/* <SmallInvestmentCard /> */}
            <CategoriesTable />
            <RecurringTableNext />
            {/* <HoldingsTable /> */}
          </div>
          <div>
            <Investmentcards items={mails} />
          </div>
          <TopCategoriesTable />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <CategoriesDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
