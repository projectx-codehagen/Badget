// components/InvestmentFormFields.tsx
"use client";

import { useEffect, useState } from "react";
import { addInvestmentAccount } from "@/actions/create-investment";
import { fetchCurrencies } from "@/actions/get-currencies";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@dingify/ui/components/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";
import { toast } from "@dingify/ui/components/use-toast";

import { cn } from "@/lib/utils";

// Define the Zod schema for investment account creation
const createInvestmentAccountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  currencyIso: z.string().min(2).max(3, { message: "Invalid currency" }),
  accountType: z.enum(["BANK", "CRYPTO", "INVESTMENT"], {
    required_error: "Account type is required",
  }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
});

// Type definition for the form data
type CreateInvestmentAccount = z.infer<typeof createInvestmentAccountSchema>;

export const InvestmentFormFields = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrencies();
      setCurrencies(data as any);
    };
    fetchData();
  }, []);

  const form = useForm<CreateInvestmentAccount>({
    resolver: zodResolver(createInvestmentAccountSchema),
    defaultValues: {
      name: "",
      accountType: "INVESTMENT",
      currencyIso: undefined,
      amount: 0,
    },
  });

  const onSubmit = async (data: CreateInvestmentAccount) => {
    try {
      await addInvestmentAccount(data);
      toast({
        title: "Investment account added successfully!",
        description: "Your investment account was added successfully.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to add your investment account",
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
        <FormField
          name="currencyIso"
          control={form.control}
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
        {/* Current Value Field */}
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Initial Amount
                {field.value
                  ? ` (${Number(field.value).toLocaleString()})`
                  : null}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Current Value..."
                  type="number"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add investment account</Button>
      </form>
    </Form>
  );
};
