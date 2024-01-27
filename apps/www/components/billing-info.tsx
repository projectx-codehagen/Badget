"use client";

import * as React from "react";
import Link from "next/link";

import { RouterOutputs } from "@projectx/api";

import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BillingInfoProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: NonNullable<RouterOutputs["auth"]["mySubscription"]>;
}

export function BillingInfo({ subscriptionPlan }: BillingInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          You are currently on the <strong>{subscriptionPlan.plan}</strong>{" "}
          plan.
        </CardDescription>
      </CardHeader>
      {/* <CardContent>{subscriptionPlan.description}</CardContent> */}
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link href="/pricing" className={cn(buttonVariants())}>
          {subscriptionPlan.isPaid ? "Manage Subscription" : "Upgrade now"}
        </Link>

        {subscriptionPlan.isPaid ? (
          <p className="rounded-full text-xs font-medium">
            {/* {subscriptionPlan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "} */}
            {formatDate(subscriptionPlan.endsAt!.toString())}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
