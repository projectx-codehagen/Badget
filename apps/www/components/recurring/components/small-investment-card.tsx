import React from "react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Sample data structure
const investmentData = [
  {
    id: 1,
    ticker: "DIS",
    name: "Disney",
    dataPoints: [
      { time: "2021-Q1", revenue: 4000 },
      { time: "2021-Q2", revenue: 14400 },
      { time: "2021-Q2", revenue: 12000 },
      { time: "2021-Q2", revenue: 18000 },
    ],
    revenue: 10400,
    subscription: 240,
  },
  {
    id: 2,
    ticker: "AAPL",
    name: "Apple",
    dataPoints: [
      { time: "2021-Q1", revenue: 8000 },
      { time: "2021-Q2", revenue: 10400 },
      { time: "2021-Q2", revenue: 4000 },
      { time: "2021-Q2", revenue: 12000 },
    ],
    revenue: 14405,
    subscription: 300,
  },
  {
    id: 3,
    ticker: "MSFT",
    name: "Microsoft",
    dataPoints: [
      { time: "2021-Q1", revenue: 4000 },
      { time: "2021-Q2", revenue: 10400 },
      { time: "2021-Q2", revenue: 8000 },
      { time: "2021-Q2", revenue: 16000 },
    ],
    revenue: 10400,
    subscription: 240,
  },
  {
    id: 4,
    ticker: "AMZN",
    name: "Amazon",
    dataPoints: [
      { time: "2021-Q1", revenue: 8000 },
      { time: "2021-Q2", revenue: 10400 },
      { time: "2021-Q2", revenue: 4000 },
      { time: "2021-Q2", revenue: 12000 },
    ],
    revenue: 14405,
    subscription: 300,
  },
  {
    id: 5,
    ticker: "GOOGL",
    name: "Alphabet",
    dataPoints: [
      { time: "2021-Q1", revenue: 8000 },
      { time: "2021-Q2", revenue: 10400 },
      { time: "2021-Q2", revenue: 4000 },
      { time: "2021-Q2", revenue: 12000 },
    ],
    revenue: 14405,
    subscription: 300,
  },
  {
    id: 6,
    ticker: "TSLA",
    name: "Tesla",
    dataPoints: [
      { time: "2021-Q1", revenue: 8000 },
      { time: "2021-Q2", revenue: 10400 },
      { time: "2021-Q2", revenue: 4000 },
      { time: "2021-Q2", revenue: 12000 },
    ],
    revenue: 14405,
    subscription: 300,
  },
  {
    id: 7,
    ticker: "FB",
    name: "Facebook",
    dataPoints: [
      { time: "2021-Q1", revenue: 7000 },
      { time: "2021-Q2", revenue: 10400 },
      { time: "2021-Q2", revenue: 4000 },
      { time: "2021-Q2", revenue: 700 },
    ],
    revenue: 14405,
    subscription: 300,
  },
  // Add more items as needed
];

export function SmallInvestmentCard() {
  return (
    <ScrollArea>
      <div className="flex w-max gap-4 p-4">
        {investmentData.map((item) => (
          <Card key={item.id} className="bg-dark-card w-[100px] shrink-0">
            <CardHeader className="flex  justify-between p-2">
              <CardTitle className="text-sm">{item.ticker}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="text-lg font-bold">{item.name}</div>
              <div className="h-[80px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={item.dataPoints} // Ensure this is an array of objects
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={false} // Add this if you don't want dots on the line
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between">
                <Badge>12%</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
