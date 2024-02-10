import { formatDistanceToNow } from "date-fns";
import {
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PositionsTable } from "@/components/transactions/components/positions-table";

export function EquityTableDisplay() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between p-4">
        {/* Left section with avatar and text */}
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/path-to-your-avatar-image.png" alt={"equity"} />
            <AvatarFallback delayMs={600}>
              {"Equity"
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(Date.now(), {
                addSuffix: true,
              })}
            </p>
            <h1 className="text-xl font-semibold ">Equity</h1>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge
            variant={10 >= 0 ? "default" : "destructive"}
            className="self-end"
          >
            {10 >= 0 ? `▲ ${"10"}%` : `▼ ${Math.abs(10).toFixed(2)}%`}
          </Badge>
          <div className="mt-2 flex items-baseline">
            <span className="text-m font-semibold">
              {/* {formatCurrency(mail.income as number)} */}
              10
            </span>
          </div>
          Updated at 23:03
        </div>
      </div>
      <div className="mx-6 h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[]}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <Line
              type="monotone"
              dataKey="income"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <RechartsTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const incomeData = payload.find(
                    (p) => p.dataKey === "income",
                  );

                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        {incomeData && (
                          <div>
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Income{" "}
                            </span>
                            <span className="font-bold">
                              {/* {formatCurrency(incomeData.value as number)} */}
                              10
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <PositionsTable />
    </div>
  );
}
