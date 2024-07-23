"use client";

import Link from "next/link";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@dingify/ui/components/chart";

const chartData = [
  { month: "January", asset: 186, debt: 80 },
  { month: "February", asset: 305, debt: 200 },
  { month: "March", asset: 237, debt: 120 },
  { month: "April", asset: 73, debt: 190 },
  { month: "May", asset: 209, debt: 130 },
  { month: "June", asset: 214, debt: 140 },
];

const chartConfig = {
  asset: {
    label: "Asset",
    color: "hsl(var(--chart-1))",
  },
  debt: {
    label: "Debt",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AssetVsDebt() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Asset vs Debt</CardTitle>
          <CardDescription>Do you have more Asset vs debt?</CardDescription>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="ml-auto gap-1 text-sm text-muted-foreground"
        >
          <Link href="/dashboard/banking">
            <span className="flex items-center">
              Banking
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="asset"
              type="monotone"
              stroke="var(--color-asset)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="debt"
              type="monotone"
              stroke="var(--color-debt)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Your getting more assets vs debt
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
