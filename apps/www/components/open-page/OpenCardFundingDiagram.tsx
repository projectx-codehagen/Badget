"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", Total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", Total: Math.floor(Math.random() * 5000) + 1000 },
];

// Custom Tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-2 text-black shadow-md">
        <p className="label">{`${payload[0].name} : ${payload[0].value} Users`}</p>
      </div>
    );
  }

  return null;
};

export default function OpenCardFundingDiagram() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="Total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Tooltip content={<CustomTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
}
