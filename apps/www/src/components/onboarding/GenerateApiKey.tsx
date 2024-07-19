"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { generateAndSaveApiKey } from "@/actions/generate-api-key";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@dingify/ui/components/card";
import { Input } from "@dingify/ui/components/input";
import { useStepper } from "@dingify/ui/components/stepper/use-stepper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dingify/ui/components/tooltip";

import { cn } from "@/lib/utils";

interface Props {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
}

export default function GenerateApiKey({ apiKey, setApiKey }: Props) {
  const [generatingApiKey, setGeneratingApiKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { nextStep } = useStepper();

  const handleClick = async () => {
    setGeneratingApiKey(true);

    const response = await generateAndSaveApiKey();

    if (response.success) {
      setApiKey(response.apiKey!);
      nextStep();

      toast.success("Your new API key has been generated successfully.");
    } else {
      console.error(response.error);
      toast.error("There was an error generating the API key.");
    }

    setGeneratingApiKey(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setHasCopied(true);
    toast.success("API key has been copied to clipboard.");
  };


  return (
    <div
      className={cn(
        apiKey &&
          "rounded-lg bg-gradient-to-r from-[#1F5A42] to-transparent p-[2px]", // border effect
      )}
    >
      <Card
        className={cn(
          apiKey && "bg-gradient-to-r from-[#073023] via-20% to-transparent ",
        )}
      >
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-semibold">
            Add an API Key
          </CardTitle>
          <CardDescription className="opacity-90 mt-2">
            Use the following generated key to authenticate requests
          </CardDescription>
          {apiKey.length ? (
            <div
              className={cn(
                "relative mt-2 rounded-md",
                apiKey && "bg-[#2B3B3A]",
              )}
            >
              <Input
                id="apiKey"
                readOnly
                type={showKey ? "text" : "password"}
                value={apiKey}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={cn(
                      "absolute right-14  top-1/2 -translate-y-1/2",
                    )}
                    onClick={() => setShowKey((prev) => !prev)}
                    variant="outline"
                  >
                    {showKey ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>show value</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={handleCopy}
                    variant="outline"
                  >
                    {hasCopied ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy API Key</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <Button onClick={handleClick} className="mt-2">
              {generatingApiKey ? (
                <Loading className="h-4 w-4" />
              ) : (
                <>
                  <LockKeyhole className="h-4 w-4" />
                  <span className="ml-2">Add api Key</span>
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
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
      class="lucide lucide-ellipsis"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function LockKeyhole(props) {
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
      class="lucide lucide-lock-keyhole"
    >
      <circle cx="12" cy="16" r="1" />
      <rect x="3" y="10" width="18" height="12" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
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

function EyeSlashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
