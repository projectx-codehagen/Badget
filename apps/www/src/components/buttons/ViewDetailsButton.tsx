"use client";

import { BellIcon, InfoIcon } from "lucide-react";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@dingify/ui/components/dialog";

export function ViewDetailsButton({ event }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-8 gap-1" size="sm" variant="outline">
          <InfoIcon className="h-3.5 w-3.5" />
          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            View Details
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            <CardHeader className="flex items-center gap-4 pb-4">
              <BellIcon className="h-8 w-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Event Notification</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Real-time alert for your team
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Event Type
                  </p>
                  <p className="font-medium">{event?.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Channel
                  </p>
                  <p className="font-medium">
                    {event?.channel?.name || "No Channel"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Project
                  </p>
                  <p className="font-medium">
                    {event?.channel?.project?.name || "No Project"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    User
                  </p>
                  <p className="font-medium">{event?.userId}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Description
                </p>
                <p>{event?.description || "No Description"}</p>
              </div>
            </CardContent>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
