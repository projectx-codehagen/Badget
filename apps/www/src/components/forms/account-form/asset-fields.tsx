// components/forms/asset-fields.tsx
"use client";

import { useEffect, useState } from "react";
import { createNewAccount } from "@/actions/create-new-account";
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

// Define the Zod schema for asset creation
const createAssetSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  currencyIso: z.string().min(2).max(3, { message: "Invalid currency" }),
  accountType: z.enum(["BANK", "CRYPTO"], {
    required_error: "Account type is required",
  }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
});

// Type definition for the form data
type CreateAsset = z.infer<typeof createAssetSchema>;

export const AssetFields = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrencies();
      setCurrencies(data as any);
    };
    fetchData();
  }, []);

  const form = useForm<CreateAsset>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: "",
      accountType: undefined,
      currencyIso: undefined,
      amount: 0,
    },
  });

  const onSubmit = async (data: CreateAsset) => {
    try {
      await createNewAccount(data);
      toast({
        title: "Asset added successfully!",
        description: "Your asset was added successfully.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to add your asset",
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
        {/* Currency Field */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
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
                                )?.name
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
                                  {currency.name}
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
          </div>

          <div className="grid gap-2">
            <FormField
              name="accountType"
              control={form.control}
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Account type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("accountType", value as any); // Cast to any to avoid type issues
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem key="BANK" value="BANK">
                            BANK
                          </SelectItem>
                          <SelectItem key="CRYPTO" value="CRYPTO">
                            CRYPTO
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
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
        <Button type="submit">Add Asset</Button>
      </form>
    </Form>
  );
};
