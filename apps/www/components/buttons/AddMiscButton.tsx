"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export function AddMiscButton() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Valuables</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Valuables</DialogTitle>
          <DialogDescription>
            Add your Valueables here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="subject">Name</Label>
          <Input id="subject" placeholder="Name..." />
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="subject">City</Label>
          <Input id="subject" placeholder="City..." />
        </div> */}
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">State</Label>
            <Input id="subject" placeholder="State..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Postal Code</Label>
            <Input id="subject" placeholder="Postal Code..." />
          </div>
        </div> */}
        <div className="grid gap-2">
          <Label htmlFor="subject">Purchase Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Purchase Value</Label>
          <Input id="subject" placeholder="Purchase Value..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Curent value</Label>
          <Input id="subject" placeholder="Curent value..." />
        </div>

        <DialogFooter>
          <Button type="submit">Add Valuables</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
