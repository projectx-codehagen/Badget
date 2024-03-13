"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AddButton } from "@/components/buttons/AddButton";
import AddTransactionModal from "@/components/modals/add-transaction";

import { Mail } from "../data";
import { useMail } from "../use-mail";
import { AccountsReviewTable2 } from "./accounts-review-table2";
import { MailList } from "./mail-list";
import { TransactionsDisplay } from "./transactions-display";

interface TransactionsDashboardProps {
  transactions: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function TransactionsDashboard({
  transactions,
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: TransactionsDashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout-transactions=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex h-[52px] items-center justify-between px-4 py-2">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
              <div className="ms-4 flex flex-grow items-center justify-between">
                <TabsList>
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    All transactions
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Unread
                  </TabsTrigger>
                </TabsList>
                <AddButton triggerLabel="Add Transaction">
                  <AddTransactionModal />
                </AddButton>
              </div>
            </div>
            <Separator />
            <TabsContent value="all" className="m-0">
              {/* @ts-ignore */}
              <AccountsReviewTable2 mailId={undefined} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={transactions.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <TransactionsDisplay
            mail={
              transactions.find((item) => item.id === mail.selected) || null
            }
          />
          {/* <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          /> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
