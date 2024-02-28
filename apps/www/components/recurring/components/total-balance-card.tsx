import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const totalBudget = 25241;
const paidSoFar = 2189;
const leftToPay = 687;

const data = [
  { name: "Paid So Far", value: paidSoFar },
  { name: "Left to Pay", value: leftToPay },
];

const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#FF8042"];

export function RecurringSpentSoFarCard() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">Left to pay</CardTitle>
          <CardTitle className="text-base font-normal">
            Paid so far
          </CardTitle>{" "}
        </CardHeader>
        <CardContent className="flex justify-between">
          {/* Left side details */}
          <div>
            <div className="text-2xl font-bold">${leftToPay}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>

          {/* Right side details */}
          <div>
            <div className="text-right text-2xl font-bold">${paidSoFar}</div>{" "}
            {/* Assuming this is the total budget */}
            <p className="text-right text-xs text-muted-foreground">
              This month
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
                startAngle={90}
                endAngle={-270}
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
