// components/RealEstateFormFields.tsx
"use client";

import { useEffect, useState } from "react";
import { addRealEstate } from "@/actions/create-realestate";
import { fetchCurrencies } from "@/actions/get-currencies";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@dingify/ui/components/button";
import { Calendar } from "@dingify/ui/components/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@dingify/ui/components/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@dingify/ui/components/form";
import { Input } from "@dingify/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dingify/ui/components/popover";
import { ScrollArea } from "@dingify/ui/components/scroll-area";
import { toast } from "@dingify/ui/components/use-toast";

import { cn } from "@/lib/utils";

// Define the Zod schema for real estate creation
const createRealEstateSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z.string().min(1, { message: "Postal Code is required" }),
  purchaseDate: z.date({ required_error: "Purchase Date is required" }),
  purchaseValue: z.coerce
    .number()
    .min(1, { message: "Purchase Value must be at least 1" }),
  currentValue: z.coerce.number().optional(),
  currencyIso: z.string().min(2).max(3, { message: "Invalid currency" }),
});

// Type definition for the form data
type CreateRealEstate = z.infer<typeof createRealEstateSchema>;

export const RealEstateFormFields = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrencies();
      setCurrencies(data as any);
    };
    fetchData();
  }, []);

  const form = useForm<CreateRealEstate>({
    resolver: zodResolver(createRealEstateSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      purchaseDate: new Date(),
      purchaseValue: 0,
      currentValue: undefined,
      currencyIso: "",
    },
  });

  const onSubmit = async (data: CreateRealEstate) => {
    try {
      await addRealEstate(data);
      toast({
        title: "Property added successfully!",
        description: "Your property was added successfully.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to add your property",
        description: "Please try again later.",
      });
    }
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
        {/* City Field */}
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
        {/* State & Postal Code Fields */}
        <div className="grid grid-cols-2 gap-4">
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

        <FormField
          control={form.control}
          name="currencyIso"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? currencies.find(
                              (currency) => currency.iso === field.value,
                            )?.symbol
                          : "Select currency..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[300px] overflow-y-auto p-0">
                    <Command>
                      <CommandInput placeholder="Search the currency..." />
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <ScrollArea className="max-h-[300px]">
                        <CommandGroup>
                          {currencies.map((currency) => (
                            <CommandItem
                              value={currency.iso}
                              key={currency.iso}
                              onSelect={() => {
                                form.setValue("currencyIso", currency.iso);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  currency.iso === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {currency.symbol}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
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
              <FormLabel>
                Purchase Value
                {field.value
                  ? ` (${Number(field.value).toLocaleString()})`
                  : null}
              </FormLabel>
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

        <Button type="submit">Add Property</Button>
      </form>
    </Form>
  );
};
