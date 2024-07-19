"use client";

import { ResponsiveLine } from "@nivo/line";

export default function AlertsOverviewChart(props) {
  const data = [
    {
      id: "Critical",
      data: [
        { x: "Jan", y: 30 },
        { x: "Feb", y: 60 },
        { x: "Mar", y: 90 },
        { x: "Apr", y: 120 },
        { x: "May", y: 50 },
        { x: "Jun", y: 40 },
      ],
    },
    {
      id: "Warning",
      data: [
        { x: "Jan", y: 50 },
        { x: "Feb", y: 80 },
        { x: "Mar", y: 100 },
        { x: "Apr", y: 110 },
        { x: "May", y: 80 },
        { x: "Jun", y: 100 },
      ],
    },
    {
      id: "Info",
      data: [
        { x: "Jan", y: 20 },
        { x: "Feb", y: 50 },
        { x: "Mar", y: 60 },
        { x: "Apr", y: 70 },
        { x: "May", y: 90 },
        { x: "Jun", y: 120 },
      ],
    },
  ];

  return (
    <div {...props}>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#e11d48", "#f97316", "#3b82f6"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
              background: "#000000",
              color: "#ffffff",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}
