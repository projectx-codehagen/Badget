"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBanks } from "@/actions/get-institutions";
import { createEndUserAgreement } from "@/actions/gocardless/create-end-user-agreement";
import { createRequisition } from "@/actions/gocardless/create-requisition";
import { listAccounts } from "@/actions/gocardless/list-accounts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@dingify/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@dingify/ui/components/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dingify/ui/components/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dingify/ui/components/popover";

import { cn } from "@/lib/utils";

const languages = [
  { label: "English", value: "en" },
  { label: "Norwegian", value: "no" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
  bank: z.string().optional(),
  maxHistoricalDays: z.number().optional(),
  accessValidForDays: z.number().optional(),
  accessScope: z.array(z.string()).optional(),
});

export function GetInstitutionsButton({ connectorConfigId }) {
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const fetchBanks = async (language: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching banks for language:", language);
      const banksData = await getBanks(language, connectorConfigId); // Pass the selected language
      console.log("Fetched banks data:", banksData);
      setBanks(banksData);
      toast.success("Banks fetched successfully");
    } catch (err) {
      console.error("Error fetching banks:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Form data submitted:", data);
    await fetchBanks(data.language);
    if (data.bank) {
      try {
        const agreement = await createEndUserAgreement(
          data.bank,
          data.maxHistoricalDays,
          data.accessValidForDays,
          data.accessScope,
        );
        toast.success("End user agreement created successfully");
        console.log("Agreement:", agreement);

        const requisition = await createRequisition(
          data.bank,
          "http://localhost:3000/dashboard/banking", // Replace with your actual redirect URL
          connectorConfigId,
          "124151", // Replace with your actual reference
          agreement.id,
          data.language,
        );
        toast.success("Requisition created successfully");
        console.log("Requisition:", requisition);

        // Redirect the user to the GoCardless link
        window.location.href = requisition.link;
      } catch (err) {
        console.error("Error creating requisition:", err);
        setError(err.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          {isLoading ? "Loading..." : "Fetch Banks"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Fetch Institutions</DialogTitle>
              <DialogDescription>
                Fetch institutions data for a specific country.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value,
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue("language", language.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the language that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {banks.length > 0 && (
              <FormField
                control={form.control}
                name="bank"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Bank</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? banks.find((bank) => bank.id === field.value)
                                  ?.name
                              : "Select bank"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search bank..." />
                          <CommandList>
                            <CommandEmpty>No bank found.</CommandEmpty>
                            <CommandGroup>
                              {banks.map((bank) => (
                                <CommandItem
                                  value={bank.name}
                                  key={bank.id}
                                  onSelect={() => {
                                    form.setValue("bank", bank.id);
                                  }}
                                >
                                  <img
                                    src={bank.logo}
                                    alt={bank.name}
                                    className="mr-2 h-4 w-4"
                                  />
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      bank.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {bank.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select a bank from the fetched list.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="maxHistoricalDays"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Max Historical Days</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      className="input"
                      placeholder="e.g., 180"
                    />
                  </FormControl>
                  <FormDescription>
                    The length of the transaction history to be retrieved.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accessValidForDays"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Access Valid For Days</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      {...field}
                      className="input"
                      placeholder="e.g., 30"
                    />
                  </FormControl>
                  <FormDescription>
                    The length of days while the access to account is valid.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accessScope"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Access Scope</FormLabel>
                  <FormControl>
                    <select
                      multiple
                      {...field}
                      className="input"
                      placeholder="Select access scope"
                    >
                      <option value="balances">Balances</option>
                      <option value="details">Details</option>
                      <option value="transactions">Transactions</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    The scope of information to be accessed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Fetch Banks"}
              </Button>
            </DialogFooter>
            {error && <p>Error: {error}</p>}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
