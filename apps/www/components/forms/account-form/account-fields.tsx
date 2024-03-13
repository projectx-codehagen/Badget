import { use } from "react";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AccountType } from "@projectx/db";
import { createAccountSchema } from "@projectx/validators";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

export const AccountFields = () => {
  const currencies = use(api.currency.findAll.query());

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      accountType: undefined,
      currencyIso: undefined,
      amount: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof createAccountSchema>) => {
    const accountBalance = await api.account.addAccount
      .mutate(data)
      .catch(() => ({ success: false as const }));

    if (!accountBalance.success) {
      return toast({
        title: "Failed to add your account",
        description: "Please try again later.",
      });
    }

    if (accountBalance.success) {
      toast({
        title: "Account added with success!",
        description: "Your account was added with success.",
      });
    }

    form.reset();
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
                      onValueChange={(value: AccountType) => {
                        form.setValue("accountType", value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            key={AccountType.BANK}
                            value={AccountType.BANK}
                          >
                            {AccountType.BANK}
                          </SelectItem>
                          <SelectItem
                            key={AccountType.CRYPTO}
                            value={AccountType.CRYPTO}
                          >
                            {AccountType.CRYPTO}
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
              <FormLabel>Current Value</FormLabel>
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
        <Button type="submit">Add bank account</Button>
      </form>
    </Form>
  );
};
