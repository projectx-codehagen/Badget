"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateAndSaveApiKey } from "@/actions/generate-api-key";

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
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dingify/ui/components/tooltip";
import { toast } from "sonner";

export function AddApiKeyButton() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasCopied]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await generateAndSaveApiKey();

    if (response.success) {
      setApiKey(response.apiKey as string);
      
      toast.success("Your new API key has been generated successfully.");
    } else {
      console.error(response.error);
      toast.error("There was an error generating the API key.");
    }

    setIsLoading(false);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(apiKey);
    setHasCopied(true);
    toast.success("API key has been copied to clipboard.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          Add new API key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create a new API key</DialogTitle>
            <DialogDescription>
              Generate a new API key to get some Dings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  readOnly
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                />
                <Button
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowKey(!showKey);
                  }}
                >
                  {showKey ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle API key visibility</span>
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      variant="ghost"
                      onClick={handleCopy}
                    >
                      {hasCopied ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy API key</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy API key</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Loading..." : "Create API key"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
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
