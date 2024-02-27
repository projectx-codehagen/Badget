import React from "react";
import {
  Layer,
  Rectangle,
  ResponsiveContainer,
  Sankey,
  Text,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data0 = {
  nodes: [
    { name: "Income" },
    { name: "Spending" },
    { name: "Savings" },
    { name: "Home" },
    { name: "Car & Transportation" },
    { name: "Food & Drinks" },
    { name: "Shopping" },
    { name: "Entertainment" },
    { name: "Subscriptions" },
    { name: "Other" },
    { name: "Stock" },
    { name: "Crypto" },
    { name: "ETF" },
  ],
  links: [
    // Flow from Income
    { source: 0, target: 1, value: 10000 }, // Income to Spending (example value)
    { source: 0, target: 2, value: 5000 }, // Income to Savings (example value)

    // Flow from Spending to categories
    { source: 1, target: 3, value: 3000 }, // Spending to Home
    { source: 1, target: 4, value: 2000 }, // Spending to Car & Transportation
    { source: 1, target: 5, value: 1500 }, // Spending to Food & Drinks
    { source: 1, target: 6, value: 800 }, // Spending to Shopping
    { source: 1, target: 7, value: 1200 }, // Spending to Entertainment
    { source: 1, target: 8, value: 400 }, // Spending to Subscriptions
    { source: 1, target: 9, value: 1000 }, // Spending to Other

    // Flow from Savings to investment types
    { source: 2, target: 10, value: 2000 }, // Savings to Stock
    { source: 2, target: 11, value: 1000 }, // Savings to Crypto
    { source: 2, target: 12, value: 2000 }, // Savings to ETF
  ],
};

interface CustomLinkProps {
  sourceX: number;
  targetX: number;
  sourceY: number;
  targetY: number;
  sourceControlX: number;
  targetControlX: number;
  linkWidth: number;
  index: number;
}

class CustomLink extends React.Component<CustomLinkProps, { fill: string }> {
  state = {
    fill: "url(#linkGradient)",
  };

  render() {
    const {
      sourceX,
      targetX,
      sourceY,
      targetY,
      sourceControlX,
      targetControlX,
      linkWidth,
      index,
    } = this.props;
    const { fill } = this.state;

    return (
      <Layer key={`CustomLink${index}`}>
        <path
          d={`
            M${sourceX},${sourceY + linkWidth / 2}
            C${sourceControlX},${sourceY + linkWidth / 2}
              ${targetControlX},${targetY + linkWidth / 2}
              ${targetX},${targetY + linkWidth / 2}
            L${targetX},${targetY - linkWidth / 2}
            C${targetControlX},${targetY - linkWidth / 2}
              ${sourceControlX},${sourceY - linkWidth / 2}
              ${sourceX},${sourceY - linkWidth / 2}
            Z
          `}
          fill={fill}
          strokeWidth="0"
          onMouseEnter={() => {
            this.setState({ fill: "rgba(0, 136, 254, 0.5)" });
          }}
          onMouseLeave={() => {
            this.setState({ fill: "url(#linkGradient)" });
          }}
        />
      </Layer>
    );
  }
}

interface CustomNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: { name: string; value: number };
  containerWidth: number;
}

function CustomNode(props: CustomNodeProps) {
  // Destructure props for clarity
  const { x, y, width, height, index, payload, containerWidth } = props;
  const isOut = x + width + 6 > containerWidth;

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#5192ca"
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? "end" : "start"}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="14"
        stroke="#333"
      >
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? "end" : "start"}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize="12"
        stroke="#333"
        strokeOpacity="0.5"
      >
        {payload.value + "k"}
      </text>
    </Layer>
  );
}

export function SankeyCard() {
  return (
    <div className="mx-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">
            User Engagement Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[500px] items-center justify-center">
            {" "}
            {/* Added flexbox styling */}
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={data0}
                node={(nodeProps) => (
                  <CustomNode {...nodeProps} containerWidth={960} />
                )}
                link={(linkProps) => <CustomLink {...linkProps} />}
                width={960}
                height={500}
              >
                <defs>
                  <linearGradient id="linkGradient">
                    <stop offset="0%" stopColor="rgba(0, 136, 254, 0.5)" />
                    <stop offset="100%" stopColor="rgba(0, 197, 159, 0.3)" />
                  </linearGradient>
                </defs>
                <Tooltip />
              </Sankey>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
