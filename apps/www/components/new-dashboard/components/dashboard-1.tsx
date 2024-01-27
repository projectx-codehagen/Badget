"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CardsStats } from "./stats";
import { TopCategoriesTable } from "./top-categories-table";
import { TransactionsReviewTable } from "./transaction-review-table";

export function Dashboard() {
  return (
    <TooltipProvider delayDuration={0}>
      <ScrollArea className="h-screen">
        <div className="flex h-[52px] items-center px-4 py-2">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <Separator />

        <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form></form>
        </div>

        <CardsStats />
        {/* <div className="ml-6 mt-6 flex gap-4"> */}
        <div className="mx-6 mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <TransactionsReviewTable />
          <TopCategoriesTable />
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}
