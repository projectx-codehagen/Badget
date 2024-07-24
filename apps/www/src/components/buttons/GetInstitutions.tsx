"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBanks } from "@/actions/gocardless/get-institutions";
import {
  createEndUserAgreement,
  createRequisition,
  getTransactions,
  listAccounts,
} from "@/sdk/gocardless";
// Updated import
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
      const banksData = await getBanks(language); // Pass the selected language
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
          agreement.id,
          data.language,
        );
        toast.success("Requisition created successfully");
        console.log("Requisition:", requisition);

        // Save the requisition ID in local storage
        localStorage.setItem("requisition_id", requisition.id);

        // Redirect the user to the GoCardless link
        window.location.href = requisition.link;
      } catch (err) {
        console.error("Error creating requisition:", err);
        setError(err.message);
      }
    }
  };
  // Function to list accounts after redirection
  const listUserAccounts = async (requisitionId: string) => {
    try {
      console.log("Requisition ID:", requisitionId);
      const accounts = await listAccounts(requisitionId);
      console.log("Accounts:", accounts);

      // Get transactions for each account
      if (accounts.accounts.length > 0) {
        const accountId = accounts.accounts[0];
        const transactions = await getTransactions(accountId);
        console.log(`Transactions for account ${accountId}:`, transactions);
      }
    } catch (error) {
      console.error("Error listing accounts:", error);
      toast.error("An error occurred while listing accounts");
    }
  };

  // Check if redirected back with requisition ID
  useEffect(() => {
    const requisitionId = localStorage.getItem("requisition_id");
    if (requisitionId) {
      console.log("Found requisition ID in local storage:", requisitionId);
      listUserAccounts(requisitionId);
      localStorage.removeItem("requisition_id"); // Clear the requisition ID from local storage
    }
  }, []);

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
              <DialogTitle>Import transactions</DialogTitle>
              <DialogDescription>
                Import your transactions from your bank.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Land</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language.value === field.value,
                              )?.label
                            : "Select land"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search land..." />
                        <CommandList>
                          <CommandEmpty>No land found.</CommandEmpty>
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
                    This is the land that will be used in the dashboard.
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
                              "justify-between",
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
                      <PopoverContent className="p-0">
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
