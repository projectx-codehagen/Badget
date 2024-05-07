"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MonthlySpendingChartSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">
          Monthly Spending
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          $<Skeleton className="mx-1 inline-block h-4 w-[60px]" /> left
        </div>
        <p className="text-xs text-muted-foreground">
          out of $<Skeleton className="mx-1 inline-block h-2 w-[50px]" />{" "}
          budgeted
        </p>
        <div className="mt-3 h-[80px]">
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
