"use client";

import { ResponsiveFunnel } from "@nivo/funnel";

export default function SalesFunnelChart(props) {
  const data = [
    {
      id: "step_sent",
      value: 92558,
      label: "Sent",
    },
    {
      id: "step_viewed",
      value: 59485,
      label: "Viewed",
    },
    {
      id: "step_clicked",
      value: 37627,
      label: "Clicked",
    },
    {
      id: "step_add_to_card",
      value: 33080,
      label: "Add To Cart",
    },
    {
      id: "step_purchased",
      value: 26116,
      label: "Purchased",
    },
  ];

  return (
    <div {...props}>
      <ResponsiveFunnel
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        direction="horizontal"
        valueFormat=">-.4s"
        colors={{ scheme: "nivo" }}
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
        }}
        borderWidth={20}
        borderColor={{ from: "color", modifiers: [] }}
        labelColor={{
          from: "color",
          modifiers: [["darker", 3]],
        }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
      />
    </div>
  );
}
