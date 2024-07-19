"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState, useTransition } from "react";
import { createChannel } from "@/actions/create-channel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { buttonVariants } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";
import { useStepper } from "@dingify/ui/components/stepper/use-stepper";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

const channelSchema = z.object({
  name: z.string(),
});

interface ChannelFormProps {
  setChannelName: Dispatch<SetStateAction<string>>;
}

export function ChannelForm({ setChannelName }: ChannelFormProps) {
  const [isPending, startTransition] = useTransition();
  const [hasChannelCreated, setHasChannelCreated] = useState(false);
  const { nextStep, activeStep } = useStepper();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof channelSchema>>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const response = await createChannel(data.name);

      if (!response.success) {
        toast.error("Channel has not been created. Please try again.");
      } else {
        setChannelName(data.name);
        setHasChannelCreated(true);
        nextStep();
        toast.success("Channel has been updated.");
      }
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn(activeStep !== 1 && (hasChannelCreated || "opacity-65"))} // adding opactiy based on activeStep and channel Creation.
    >
      <div
        className={cn(
          hasChannelCreated &&
            "rounded-lg bg-gradient-to-r from-[#1F5A42] to-transparent p-[2px]", // border effect
        )}
      >
        <Card
          className={cn(
            hasChannelCreated &&
              "bg-gradient-to-r from-[#073023] from-20% via-transparent via-80% to-black to-100% ",
          )}
        >
          <CardHeader>
            <CardTitle className="text-2xl">Create a channel</CardTitle>
            <CardDescription>Please enter channel name.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                channel
              </Label>
              <Input
                id="channel"
                className={cn(hasChannelCreated && "bg-[#2B3B3A]")}
                size={32}
                {...register("name")}
                disabled={activeStep !== 1}
              />
              {errors.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <button
              type="submit"
              className={cn(buttonVariants())}
              disabled={activeStep !== 1 || isPending}
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>{isPending ? "Saving" : "Save"}</span>
            </button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
