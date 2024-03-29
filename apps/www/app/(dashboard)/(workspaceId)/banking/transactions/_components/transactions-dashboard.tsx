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

import { Mail, Transaction } from "../data";
import { useMail } from "../use-mail";
import { MailList } from "./mail-list";
import { TransactionList } from "./transaction-list";
import { TransactionsDisplay } from "./transactions-display";

interface TransactionsDashboardProps {
  transactions: Transaction[];
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
              <AddButton triggerLabel="Add Transaction">
                <AddTransactionModal />
              </AddButton>
            </div>
            <Separator />
            <TabsContent value="all" className="m-0">
              {/* @ts-ignore */}
              <TransactionList data={transactions} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <TransactionsDisplay
            data={
              transactions.find(
                (item) => item.id.toString() === mail.selected,
              ) || null
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
