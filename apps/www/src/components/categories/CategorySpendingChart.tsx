"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

interface SpendingData {
  date: string;
  amount: number;
}

interface CategorySpendingChartProps {
  categoryName: string;
  spendingData: SpendingData[];
  budget: number;
}

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function CategorySpendingChart({
  categoryName,
  spendingData,
  budget,
}: CategorySpendingChartProps) {
  const last7Days = spendingData.slice(-7);
  const averageSpending =
    last7Days.reduce((sum, day) => sum + day.amount, 0) / 7;
  const totalSpent = last7Days.reduce((sum, day) => sum + day.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Last 7 Days</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          ${totalSpent.toFixed(2)}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            spent
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={last7Days}>
            <Bar
              dataKey="amount"
              fill="hsl(var(--primary))"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }
            />
            <YAxis hide />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const data = payload[0]?.payload;
                  return (
                    <div className="rounded-lg bg-background p-2 shadow-md">
                      <p className="font-semibold">
                        {new Date(data.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p>${data.amount.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={averageSpending}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Spending"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={`$${averageSpending.toFixed(2)}`}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have spent{" "}
          <span className="font-medium text-foreground">
            ${totalSpent.toFixed(2)}
          </span>{" "}
          on {categoryName}.
        </CardDescription>
        <CardDescription>
          Your budget for this category is{" "}
          <span className="font-medium text-foreground">
            ${budget.toFixed(2)}
          </span>
          .
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
