"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateNotificationSettings } from "@/actions/change-notification-settings";
import { testWebhook } from "@/actions/testwebhook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ExternalLinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  provider: z.string({
    required_error: "Please select a provider.",
  }),
  webhook: z.string().min(2, {
    message: "Webhook must be at least 2 characters.",
  }),
});

export function NotificationAlert({ initialSettings }) {
  const [isTesting, setIsTesting] = useState(false); // Manage testing state
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: initialSettings?.details?.name || "",
      provider: initialSettings?.type || "",
      webhook: initialSettings?.details?.webhook || "",
    },
  });

  const selectedProvider = form.watch("provider");

  useEffect(() => {
    form.reset({
      name: initialSettings?.details?.name || "",
      provider: initialSettings?.type || "",
      webhook: initialSettings?.details?.webhook || "",
    });
  }, [initialSettings, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(updateNotificationSettings(data), {
      loading: "Updating...",
      success: (result) => {
        if (result.success) {
          return "Notification Settings Updated.";
        } else {
          throw new Error(result.error);
        }
      },
      error: (err) => `Error updating notification settings: ${err.message}`,
    });
  }

  async function handleTestWebhook() {
    const data = form.getValues(); // Get current form values
    setIsTesting(true);

    toast.promise(
      testWebhook(data)
        .then((result) => {
          setIsTesting(false);
          if (result.success) {
            return "Webhook is working!";
          } else {
            throw new Error(result.error);
          }
        })
        .catch((error) => {
          setIsTesting(false);
          throw new Error(`Error testing webhook: ${error.message}`);
        }),
      {
        loading: "Testing webhook...",
        success: "Webhook is working!",
        error: (err) => `Error testing webhook: ${err.message}`,
      },
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Select Notification Channel</CardTitle>
              <CardDescription>
                Select the notification channels you want notifications to be
                sent to.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Discord" {...field} />
                      </FormControl>
                      <FormDescription>Name of the connection</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DISCORD">Discord</SelectItem>
                          <SelectItem value="SLACK">Slack</SelectItem>
                          <SelectItem value="EMAIL">Email</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        What channel/provider to send a notification.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="webhook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedProvider === "DISCORD"
                        ? "Discord URL"
                        : selectedProvider === "SLACK"
                          ? "Slack URL"
                          : "Webhook URL"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          selectedProvider === "DISCORD"
                            ? "https://discord.com/api/webhooks/{channel_id}/xxx..."
                            : selectedProvider === "SLACK"
                              ? "https://hooks.slack.com/services/xxx..."
                              : "Webhook URL"
                        }
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-center justify-between">
                      <FormDescription>Your Webhook URL</FormDescription>
                      {selectedProvider === "DISCORD" && (
                        <FormDescription className="flex items-center font-semibold underline">
                          <Link
                            href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
                            target="_blank"
                          >
                            How to setup your Discord webhook
                            {/* <ExternalLinkIcon className="ml-1" size={16} /> */}
                          </Link>
                        </FormDescription>
                      )}
                      {selectedProvider === "SLACK" && (
                        <FormDescription className="flex items-center font-semibold underline">
                          <Link
                            href="https://api.slack.com/messaging/webhooks#getting_started"
                            target="_blank"
                          >
                            How to setup your Slack webhook
                            {/* <ExternalLinkIcon className="ml-1" size={16} /> */}
                          </Link>
                        </FormDescription>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="space-x-2">
              <div className="ml-auto flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={handleTestWebhook}
                  disabled={isTesting}
                >
                  Test Webhook
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
