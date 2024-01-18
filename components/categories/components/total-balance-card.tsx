import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function SpentSoFarCard() {
  return (
    <div className="">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Spent so far</CardTitle>
          <CardTitle className="text-base font-normal">
            Total budget
          </CardTitle>{" "}
        </CardHeader>
        <CardContent className="flex justify-between">
          {/* Left side details */}
          <div>
            <div className="text-2xl font-bold">$10,241</div>
            <p className="text-xs text-muted-foreground">
              You have left $1,248 to spend
            </p>
          </div>

          {/* Right side details */}
          <div>
            <div className="text-right text-2xl font-bold">$15,000</div>{" "}
            {/* Assuming this is the total budget */}
            <p className="text-right text-xs text-muted-foreground">
              Your total budget
            </p>
          </div>
        </CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
