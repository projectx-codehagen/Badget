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

import { Transaction } from "../../transactions/data";
import { Account, Mail } from "../data";
import { useMail } from "../use-mail";
import { AccountsDisplay } from "./accounts-display";
import { AccountsList } from "./accounts-list";

interface AccountsDashboardProps {
  accountList: Account[];
  defaultLayout: number[] | undefined;
}

export function AccountsDashboard({
  accountList,
  defaultLayout = [20, 40, 40],
}: AccountsDashboardProps) {
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout-accounts=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between gap-4 px-4 py-2">
              <form className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <Separator />
            <TabsContent value="all" className="m-0">
              <AccountsList items={accountList} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <AccountsDisplay
            account={
              accountList.find(
                (item) => item.id.toString() === mail.selected,
              ) || null
            }
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
