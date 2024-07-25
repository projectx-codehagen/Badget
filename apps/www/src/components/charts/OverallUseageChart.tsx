"use client";

import React from "react";
import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

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

const weeklyData = [
  { date: "2024-01-01", spent: 200 },
  { date: "2024-01-02", spent: 210 },
  { date: "2024-01-03", spent: 220 },
  { date: "2024-01-04", spent: 130 },
  { date: "2024-01-05", spent: 140 },
  { date: "2024-01-06", spent: 250 },
  { date: "2024-01-07", spent: 160 },
];

const totalSpent = weeklyData.reduce((acc, day) => acc + day.spent, 0);
const averageSpent = (totalSpent / weeklyData.length).toFixed(2);
const budget = 1500;
const remainingBudget = budget - totalSpent;

export function OverallUseageChart() {
  return (
    <Card className="">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle>Weekly Spending</CardTitle>
        <CardDescription>
          ${remainingBudget} left out of ${budget} budgeted
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            spent: {
              label: "Spent",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={weeklyData}
          >
            <Bar
              dataKey="spent"
              fill="var(--color-spent)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={averageSpent}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Spent"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={`$${averageSpent}`}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have spent{" "}
          <span className="font-medium text-foreground">${totalSpent}</span>.
        </CardDescription>
        <CardDescription>
          You have{" "}
          <span className="font-medium text-foreground">
            ${remainingBudget}
          </span>{" "}
          left to use this week.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
