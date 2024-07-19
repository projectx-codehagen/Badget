"use client";

import Link from "next/link";
import { createEvent } from "@/actions/create-event";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@dingify/ui/components/button";
import { Checkbox } from "@dingify/ui/components/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dingify/ui/components/form";
import { Input } from "@dingify/ui/components/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@dingify/ui/components/sheet";
import { toast } from "sonner";

// Define the validation schema
const FormSchema = z.object({
  channel: z.string().min(1, "Channel is required"),
  name: z.string().min(1, "Name is required"),
  event: z.string().min(1, "Event is required"),
  user_id: z.string().min(1, "User ID is required"),
  icon: z.string().min(1, "Icon is required"),
  notify: z.boolean(),
});

export function EventDashboardDetailsSheet() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      channel: "",
      name: "",
      event: "",
      user_id: "",
      icon: "",
      notify: true,
    },
  });

  const onSubmit = async (data) => {
    console.log("Form data to submit:", data); // Log form dat
    try {
      const result = await createEvent(data);
      if (result.success) {
        toast.message(
          <div className="flex flex-col">
            <span>Event Created.</span>
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          </div>);
        console.log("Event created:", result.event); // Log the created event
        // Optionally refresh the page or clear the form
        form.reset();
      }
    } catch (error) {
      toast.error("There was an error creating the event.");
      console.error("Error creating event:", error); // Log any error
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Test Event</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Event</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new event.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel</FormLabel>
                  <FormControl>
                    <Input placeholder="Channel name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Event name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <FormControl>
                    <Input placeholder="Event type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="User ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input placeholder="Icon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notify"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Notify</FormLabel>
                  <FormDescription>
                    You can manage your notifications in the{" "}
                    <Link href="/dashboard/settings">settings</Link> page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="tags.plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan</FormLabel>
                  <FormControl>
                    <Input placeholder="Plan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="tags.cycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cycle</FormLabel>
                  <FormControl>
                    <Input placeholder="Cycle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
