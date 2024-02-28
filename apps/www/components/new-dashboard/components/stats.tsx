import { useTheme } from "next-themes";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

// Function to calculate percentage change (if you have the previous values)
// @ts-ignore
function calculateChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Example static values for assets and debt changes
const assetsChange = calculateChange(32685, 34000); // replace with real data if needed
const debtChange = calculateChange(10936, 10500); // replace with real data if needed

export function CardsStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            Monthly Spending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,241 left</div>
          <p className="text-xs text-muted-foreground">
            out of $4,120 budgeted
          </p>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="revenue"
                  // activeDot={{
                  //   r: 6,
                  //   style: { fill: "var(--theme-primary)", opacity: 0.25 },
                  // }}
                  // style={
                  //   {
                  //     stroke: "var(--theme-primary)",
                  //   } as React.CSSProperties
                  // }
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Assets & Debt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {/* Assets */}
            <div className="flex flex-col">
              <div className="text-2xl font-bold">$32,685</div>
              <p className="text-xs text-muted-foreground">Assets</p>
              <div className="flex items-center">
                <Badge variant={assetsChange >= 0 ? "default" : "destructive"}>
                  {assetsChange >= 0
                    ? `▲ ${assetsChange.toFixed(2)}%`
                    : `▼ ${Math.abs(assetsChange).toFixed(2)}%`}
                </Badge>
              </div>
            </div>

            {/* Debt */}
            <div className="flex flex-col">
              <div className="text-2xl font-bold">$10,936</div>
              <p className="text-xs text-muted-foreground">Debt</p>
              <div className="flex items-center">
                <Badge variant={debtChange < 0 ? "destructive" : "default"}>
                  {debtChange < 0
                    ? `▼ ${Math.abs(debtChange).toFixed(2)}%`
                    : `▲ ${debtChange.toFixed(2)}%`}
                </Badge>
              </div>
            </div>
          </div>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="subscription"
                  style={
                    {
                      fill: "currentColor",
                      opacity: 1,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
