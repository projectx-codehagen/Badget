"use client";

import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import type { ChartConfig } from "@dingify/ui/components/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@dingify/ui/components/chart";

interface CategoryData {
  id: string;
  name: string;
  icon: string;
  spent: number;
  budget: number;
  _count: { transactions: number };
}

interface CategoryChartProps {
  categories: CategoryData[];
}

export function CategoryChart({ categories }: CategoryChartProps) {
  const chartData = React.useMemo(() => {
    return categories.map((category, index) => ({
      name: category.name,
      value: category._count.transactions,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    }));
  }, [categories]);

  const totalTransactions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  const totalSpent = React.useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.spent, 0);
  }, [categories]);

  const totalBudget = React.useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.budget, 0);
  }, [categories]);

  const budgetRemaining = React.useMemo(() => {
    return totalBudget - totalSpent;
  }, [totalBudget, totalSpent]);

  const percentRemaining = React.useMemo(() => {
    return totalBudget > 0 ? (budgetRemaining / totalBudget) * 100 : 0;
  }, [budgetRemaining, totalBudget]);

  const formattedBudgetRemaining = React.useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(budgetRemaining);
  }, [budgetRemaining]);

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      value: { label: "Transactions" },
    };
    categories.forEach((category, index) => {
      config[category.name] = {
        label: category.name,
        color: `hsl(var(--chart-${(index % 5) + 1}))`,
      };
    });
    return config;
  }, [categories]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Category Distribution</CardTitle>
        <CardDescription>Transaction count per category</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-semibold">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Budget</p>
            <p className="text-2xl font-semibold">${totalBudget.toFixed(2)}</p>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTransactions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Transactions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          You have {formattedBudgetRemaining} left in your budget{" "}
          {percentRemaining > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="text-center text-xs text-muted-foreground">
          {percentRemaining.toFixed(1)}% of budget remaining
        </div>
      </CardFooter>
    </Card>
  );
}
