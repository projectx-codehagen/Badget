"use client";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { buttonVariants } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

import { cn } from "../../lib/utils";
import { GetStartedButton } from "../buttons/GetStartedButton";
import { Icons } from "../shared/icons";
import AlertsOverviewChart from "./charts/AlertsOverviewChart";

export default function HeroSection() {
  return (
    <section className="space-y-6 pb-12 pt-16 lg:py-28">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div
            className="flex animate-fade-up flex-col justify-center space-y-4 opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                <Balancer>Real-Time Monitoring with Dingify</Balancer>
              </h1>
              <p
                className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl lg:text-lg xl:text-xl"
                style={{
                  animationDelay: "0.35s",
                  animationFillMode: "forwards",
                }}
              >
                Unlock the power of seamless real-time monitoring that
                captivates your audience and drives results.
              </p>
            </div>
            <div
              className="flex animate-fade-up flex-col gap-2 opacity-0 min-[400px]:flex-row"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <GetStartedButton />
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-4",
                )}
              >
                <Icons.chevrondown className="mr-2 h-4 w-4" />
                <p>
                  <span className="hidden sm:inline-block">Explore</span>{" "}
                  Dingify{" "}
                </p>
              </Link>
            </div>
          </div>
          <Card
            className="h-full w-full animate-fade-up opacity-0"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <CardHeader>
              <CardTitle>Alerts Overview</CardTitle>
              <CardDescription>
                A graph showing the different alert types over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsOverviewChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
