"use client";

import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

const lineChartData = [
  { month: "Jan", events: 400, users: 240 },
  { month: "Feb", events: 300, users: 139 },
  { month: "Mar", events: 200, users: 980 },
  { month: "Apr", events: 278, users: 390 },
  { month: "May", events: 189, users: 480 },
  { month: "Jun", events: 239, users: 380 },
  { month: "Jul", events: 349, users: 430 },
  { month: "Aug", events: 430, users: 210 },
  { month: "Sep", events: 480, users: 340 },
  { month: "Oct", events: 390, users: 460 },
  { month: "Nov", events: 139, users: 220 },
  { month: "Dec", events: 240, users: 190 },
];

export function UserChartActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Over Time</CardTitle>
        <CardDescription>Tracking the number of events month.</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineChartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0]?.payload.month}
                          </span>
                          <span className="font-bold">
                            Events: {payload[0]?.value}
                          </span>
                          <span className="font-bold">
                            Users: {payload[1]?.value}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="events"
                strokeWidth={2}
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                dataKey="users"
                strokeWidth={2}
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
