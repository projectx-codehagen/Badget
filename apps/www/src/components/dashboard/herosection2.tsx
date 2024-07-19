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

import { getGreeting } from "@/lib/utils";

import { cn } from "../../lib/utils";
import { GetStartedButton } from "../buttons/GetStartedButton";
import SalesFunnelChart from "./charts/SalesFunnelChart";

export default function HeroSection2() {
  const greeting = getGreeting();
  return (
    <section className="space-y-6 pb-12 pt-16 lg:py-6">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[600px_1fr]">
          <Card
            className="h-full w-full animate-fade-up opacity-0"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            <CardHeader>
              <CardTitle>Sales Funnel Overview</CardTitle>
              <CardDescription>
                A graph showing conversion rates over different steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SalesFunnelChart className="aspect-[4/3]" />
            </CardContent>
          </Card>

          <div
            className="flex animate-fade-up flex-col justify-center space-y-4 opacity-0"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <div className="space-y-2">
              <h1
                className="animate-fade-up text-4xl font-bold tracking-tighter opacity-0 sm:text-5xl md:text-6xl lg:text-7xl/none"
                style={{
                  animationDelay: "0.35s",
                  animationFillMode: "forwards",
                }}
              >
                <Balancer>Track your Important Events this {greeting}</Balancer>
              </h1>
              <p
                className="max-w-[700px] animate-fade-up text-gray-500 opacity-0 dark:text-gray-400 md:text-xl lg:text-lg xl:text-xl"
                style={{
                  animationDelay: "0.45s",
                  animationFillMode: "forwards",
                }}
              >
                Unlock the power of seamless real-time monitoring that
                captivates your audience and drives results.
              </p>
            </div>
            <div
              className="flex animate-fade-up flex-col gap-2 opacity-0 min-[400px]:flex-row"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              <GetStartedButton />
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "px-4",
                )}
              >
                Explore Dingity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
