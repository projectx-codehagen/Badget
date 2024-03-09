import { use } from "react";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  createAccountSchema,
  createRealEstateSchema,
} from "@projectx/validators";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

import { CommonAccountFields } from "./common-account-fields";
import { NameField } from "./name-field";

export const RealEstateFormFields = () => {
  const currencies = use(api.currency.findAll.query());

  const form = useForm<z.infer<typeof createRealEstateSchema>>({
    resolver: zodResolver(createRealEstateSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      purchaseDate: new Date(),
      purchaseValue: 0,
      currentValue: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createRealEstateSchema>) => {
    // const accountBalance = await api.account.addBankAccount
    //   .mutate(data)
    //   .catch(() => ({ success: false as const }));

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name..." />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Address Field  */}
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Address..." />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {/* City Field */}
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="City..." />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {/* State & Postal Code Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="State..." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Postal Code..." />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="purchaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Purchase Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
        {/* Purchase Value Field */}
        <FormField
          control={form.control}
          name="purchaseValue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Purchase Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Purchase Value..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Current Value Field */}
        <FormField
          control={form.control}
          name="currentValue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Current Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Current Value..."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Add Property</Button>
      </form>
    </Form>
  );
};
