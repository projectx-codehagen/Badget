import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

export function UserPowerCard({ customerDetails }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Status</CardTitle>
        <CardDescription>Health of the customer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-semibold leading-none tracking-tight">
          {customerDetails.userStatus}
        </div>
      </CardContent>
    </Card>
  );
}
