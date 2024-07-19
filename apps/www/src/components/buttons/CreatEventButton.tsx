"use client";

import { useEffect, useState } from "react";
import { createEvent } from "@/actions/create-event"; // Import the createEvent action
import { getUserData } from "@/actions/get-user-details";
import { CopyIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner"; // Import toast from sonner

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";

import { Confetti } from "../ui/confetti";
import { CheckIcon } from "lucide-react";

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

export function CreateEventButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await getUserData();
        setApiKey(data.apiKey as string);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }

    fetchUserData();
  }, []);

  const handleButtonClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Hardcoded event data for now; modify this to collect data from a form if needed
    const eventData = {
      channel: "new-channel-name",
      name: "New-payment",
      user_id: "user-123",
      icon: "🤩",
      notify: true,
    };

    try {
      await createEvent(eventData); // Call the createEvent action with event data
      handleClick();
      setIsOpen(false); // Close the dialog after the event is created
    } catch (error) {
      console.error("Error creating event", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    setHasCopied(true);
    toast.success("cURL command copied to clipboard.");
  };

  const curlCommand = `
  curl -X POST https://api.dingify.workers.dev/api/events \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey}" \\
  -d '{
    "channel": "new-channel-name",
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

  return (
    <>
      <Button
        variant="default"
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
      >
        Create Test Event
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[950px]">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>
              Post this into your terminal to create a new event or press the
              button.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <SyntaxHighlighter language="json" style={dracula}>
              {curlCommand}
            </SyntaxHighlighter>
            <CopyToClipboard text={curlCommand} onCopy={handleCopy}>
              <Button variant="outline" className="absolute right-2 top-2">
                {hasCopied ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
            </CopyToClipboard>
          </div>
          <form onSubmit={handleButtonClick} className="space-y-4">
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Processing..." : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
