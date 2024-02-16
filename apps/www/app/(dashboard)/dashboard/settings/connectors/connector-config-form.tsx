"use client";

import * as React from "react";
import { RouterOutputs } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  UpdateConnectorConfig,
  updateConnectorConfigSchema,
} from "@projectx/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

type ConnectorConfigProps = {
  connectorConfig: RouterOutputs["connectors"]["listConnectors"][number]["connectorConfig"];
};

export function ConnectorConfigForm({ connectorConfig }: ConnectorConfigProps) {
  const form = useForm<UpdateConnectorConfig>({
    resolver: zodResolver(updateConnectorConfigSchema),
    mode: "onChange",
  });

  const onSubmit = (data: UpdateConnectorConfig) => {
    console.log(data); // Handle form submission

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  // TODO: make this form as vercel env insert

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Integration</FormLabel>

              <FormDescription>
                This is the intergation that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
