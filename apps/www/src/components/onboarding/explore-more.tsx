"use client";

import { useRouter } from "next/navigation";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { Separator } from "@dingify/ui/components/separator";
import { useStepper } from "@dingify/ui/components/stepper/use-stepper";

import { cn } from "@/lib/utils";

// should get the values, for now just handcoded.!
const exploreConfig = [
  {
    title: "Read Docs",
    description:
      "Read the documentation to learn more about Dingify's features",
    buttonText: "Docs",
    href: "https://docs.dingify.io/introduction",
  },
  {
    title: "Dashboard",
    description: "View and manage your events and more from the dashboard",
    buttonText: "Dashboard",
    href: "https://www.dingify.io/dashboard",
  },
  {
    title: "Add new channels",
    description: "Add new channels to your Dingify account",
    buttonText: "Add channel",
    href: "https://www.dingify.io/dashboard",
  },
];

export default function ExploreMore() {
  const router = useRouter();
  const { activeStep } = useStepper();
  return (
    <Card className={cn(activeStep !== 3 && "opacity-65")}>
      <CardHeader>
        <CardTitle>Explore more</CardTitle>
        <CardDescription>
          Continue unlocking Dingify's full capabilities and setup
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-around gap-2">
          {exploreConfig.map((item) => (
            <Card className="flex max-w-60 flex-col items-start border-[1px]">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <Separator className="my-2" />
                <Button
                  onClick={() => router.push(item.href)}
                  className="mt-2 self-start"
                  disabled={activeStep !== 3}
                >
                  {item.buttonText}
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
