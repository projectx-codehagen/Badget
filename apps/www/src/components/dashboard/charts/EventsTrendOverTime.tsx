"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

const lineChartData = [
  { month: "Jan", events: 400 },
  { month: "Feb", events: 300 },
  { month: "Mar", events: 200 },
  { month: "Apr", events: 278 },
  { month: "May", events: 189 },
  { month: "Jun", events: 239 },
  { month: "Jul", events: 349 },
  { month: "Aug", events: 430 },
  { month: "Sep", events: 480 },
  { month: "Oct", events: 390 },
  { month: "Nov", events: 139 },
  { month: "Dec", events: 240 },
];

const barChartData = [
  { eventType: "Login", count: 120 },
  { eventType: "Logout", count: 98 },
  { eventType: "Purchase", count: 140 },
  { eventType: "Signup", count: 80 },
  { eventType: "Profile Update", count: 150 },
  { eventType: "Password Reset", count: 60 },
];

export default function EventsTrendOverTimeChart(
  {
    // lineChartData,
    // barChartData,
  },
) {
  return (
    <div className=" grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            Monthly Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Event Trends Over Time</div>
          <p className="text-xs text-muted-foreground">
            Number of events created each month over the last year.
          </p>
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Month
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0]?.payload.month}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Events
                              </span>
                              <span className="font-bold">
                                {payload[0]?.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="events" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            Top Event Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Event Type Breakdown</div>
          <p className="text-xs text-muted-foreground">
            Number of each event type over the last year.
          </p>
          <div className="mt-4 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eventType" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Event Type
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0]?.payload.eventType}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Count
                              </span>
                              <span className="font-bold">
                                {payload[0]?.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="count"
                  style={
                    {
                      fill: "var(--theme-primary)",
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
