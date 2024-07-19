"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
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

// Placeholder data for the past week
const PREVIOUS_WEEK_DATA = [
  { name: "30th Nov", users: 30 },
  { name: "1st Dec", users: 50 },
  { name: "2nd Dec", users: 45 },
  { name: "3rd Dec", users: 60 },
  { name: "4th Dec", users: 70 },
  { name: "5th Dec", users: 65 },
];

export default function UserGrowthTrend() {
  return (
    <div className="mt-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            User Growth Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Estimated Growth of Users</div>
          <p className="text-xs text-muted-foreground">
            Growth trend over the past week.
          </p>
          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={PREVIOUS_WEEK_DATA}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  name="Users"
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
