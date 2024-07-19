"use client";

import type { FormEvent } from "react";
import { useState, useTransition } from "react";
import { createEvent } from "@/actions/create-event";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { useStepper } from "@dingify/ui/components/stepper/use-stepper";

import { cn } from "@/lib/utils";

import { Confetti } from "../ui/confetti";

SyntaxHighlighter.registerLanguage("json", json);

const handleClick = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    Confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    Confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

interface EventFormProp {
  apiKey: string;
  channelName: string;
}

export function EventForm({ apiKey, channelName }: EventFormProp) {
  const { nextStep, activeStep } = useStepper();
  const [hasCopied, setHasCopied] = useState(false);
  const [hasEventCreated, setHasEventCreated] = useState(false);
  const [isPending, startTransition] = useTransition();

  const curlCommand = `
  curl -X POST https://api.dingify.workers.dev/api/events \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey}" \\
  -d '{
    "channel": "${channelName || "new-channel"}" ,
    "name": "New-payment",
    "userId": "user-123",
    "icon": "🤩",
    "notify": true,
    "tags": {
      "plan": "premium",
      "cycle": "monthly"
    }
  }'

  `;
  const handleCopy = () => {
    setHasCopied(true);
    toast.success("cURL command hascopied to clipboard.");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const eventData = {
      channel: channelName,
      name: "New-payment",
      user_id: "user-123",
      icon: "🤩",
      notify: true,
    };
    startTransition(async () => {
      try {
        await createEvent(eventData); // Call the createEvent action with event data
        handleClick();
        setHasEventCreated(true);
        nextStep();
      } catch (error) {
        console.error("Error creating event", error);
      }
    });
  };


  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div
        className={cn(
          hasEventCreated &&
            "rounded-lg bg-gradient-to-r from-[#1F5A42] to-transparent p-[2px]", // border-effect
        )}
      >
        <Card
          className={cn(
            activeStep !== 2 && (hasEventCreated || "opacity-65"), // adding opacity based activeStep and event creation.
            hasEventCreated && "bg-gradient-to-r from-[#073023] to-transparent"
          )}
        >
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>
              Post this into your terminal to create a new event or press the
              button.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card>
              <div className="relative">
                <SyntaxHighlighter language="json" style={dracula}>
                  {curlCommand}
                </SyntaxHighlighter>
                <CopyToClipboard text={curlCommand} onCopy={handleCopy}>
                  <Button
                    variant="outline"
                    className="absolute right-2 top-2"
                    disabled={activeStep !== 2 || !hasEventCreated}
                  >
                    {hasCopied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </CopyToClipboard>
              </div>
            </Card>
          </CardContent>
          <CardFooter>
            <Button disabled={activeStep !== 2 || isPending}>
              {isPending ? <Loading /> : "Create Event"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}

function Loading(props) {
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
      class="lucide lucide-loader-circle"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
