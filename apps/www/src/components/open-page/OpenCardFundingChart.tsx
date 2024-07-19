"use client";

import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Founders", value: 90.0 },
  { name: "Team Pool", value: 10.0 },
];

const COLORS = ["#888888", "#FAFAFA"]; // Adjust colors for better visibility if necessary

// Custom Tooltip component
// @ts-ignore
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white p-2 text-black shadow-md">
        <p className="label">{`${payload[0].name} : ${payload[0].value} %`}</p>
      </div>
    );
  }

  return null;
};

// Custom legend formatter function
// @ts-ignore
const renderColorfulLegendText = (value, entry) => {
  const { color } = entry;
  return <span style={{ color }}>{`${value} ${entry.payload.value}%`}</span>;
};

export default function OpenCardFundingChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={70}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={<CustomTooltip active={undefined} payload={undefined} />}
        />
        <Legend
          formatter={renderColorfulLegendText}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
