"use client";

import * as React from "react";
import { RouterOutputs } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  integration: z.bigint({
    required_error: "Please select an integration.",
  }),
  accountHolderName: z
    .string()
    .min(2, {
      message: "Account holder name must be at least 2 characters.",
    })
    .max(30, {
      message: "Account holder name must not be longer than 30 characters.",
    }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
});

type IntegrationFormProps = {
  integrations: RouterOutputs["integrations"]["listIntegrations"];
};

export function IntegrationForm({ integrations }: IntegrationFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const integration = integrations.find((i) => i.id === data.integration);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(integration, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="integration"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Integration</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[300px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? integrations.find(
                            (integration) => integration.id === field.value,
                          )?.name
                        : "Select integration"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="h-[300px] w-[300px] overflow-y-auto p-0">
                  <Command>
                    <CommandInput placeholder="Search integration..." />
                    <CommandEmpty>No integration found.</CommandEmpty>
                    <ScrollArea className="max-h-[300px]">
                      <CommandGroup>
                        {integrations.map((integration) => (
                          <CommandItem
                            value={integration.name}
                            key={integration.id}
                            onSelect={() => {
                              form.setValue("integration", integration.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                integration.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {integration.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the intergation that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Holder Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter account holder name" {...field} />
              </FormControl>
              <FormDescription>Bank account holder name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Integration Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormDescription>Bank name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
