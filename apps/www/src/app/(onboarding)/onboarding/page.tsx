"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import type { StepItem } from "@dingify/ui/components/stepper/index";
import { Step, Stepper } from "@dingify/ui/components/stepper/index";

import { cn } from "@/lib/utils";
import { ChannelForm } from "@/components/onboarding/channel-form";
import { EventForm } from "@/components/onboarding/event-form";
import ExploreMore from "@/components/onboarding/explore-more";
import GenerateApiKey from "@/components/onboarding/GenerateApiKey";

import { useRouter } from "next/navigation";

export default function OnBoardingPage() {

  const {data: session} = useSession()
  const router = useRouter()

  if(session === null) {
       router.push("/login")
  }

  const steps = [
    { label: "step 1", description: "step 1" },
    { label: "step 2", description: "step 2" },
    { label: "step 3", description: "step 3" },
    { label: "step 4", description: "step 4" },
  ] as StepItem[];

  const [apiKey, setApiKey] = useState("");
  const [channelName, setChannelName] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">
            Create your first event
          </h1>
          <p className="text-lg text-muted-foreground">
            Follow the steps to create your first event
          </p>
        </div>
      </div>
      <Stepper
        orientation={"vertical"}
        initialStep={0}
        steps={steps}
        size="sm"
        expandVerticalSteps
        styles={{
          "step-button-container": cn("border-none"),
        }}
      >
        <Step icon={CircleIcon}>
          <GenerateApiKey apiKey={apiKey} setApiKey={setApiKey} />
        </Step>
        <Step icon={CircleIcon}>
          <ChannelForm setChannelName={setChannelName} />
        </Step>
        <Step icon={CircleIcon}>
          <EventForm apiKey={apiKey} channelName={channelName} />
        </Step>
        <Step icon={CircleIcon}>
          <ExploreMore />
        </Step>
      </Stepper>
    </div>
  );
}

function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-circle"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
