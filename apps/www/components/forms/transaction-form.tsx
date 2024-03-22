import { use, useState } from "react";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createTransactionSchema } from "@projectx/validators";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Command,
  CommandAddNew,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "../ui/use-toast";

const TransactionForm = () => {
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] =
    useState<boolean>(false);

  const currencies = use(api.currency.findAll.query());
  const accounts = use(api.account.listAccounts.query());
  const assets = use(api.asset.listAssets.query());

  const assetsAndAccounts = [
    ...accounts.map((account) => ({
      label: account.name,
      value: account.id,
    })),
    ...assets.map((asset) => ({
      label: asset.name,
      value: asset.id,
    })),
  ];

  const form = useForm<z.infer<typeof createTransactionSchema>>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {},
  });

  // const [transactionCategories, setTransactionCategories] = useState([
  //   { label: "Groceries", value: "groceries" },
  //   { label: "Utilities", value: "utilities" },
  //   { label: "Entertainment", value: "entertainment" },
  // ]);

  // const [categorySearchQuery, setCategorySearchQuery] = useState("");

  // const noCategoriesFound =
  //   transactionCategories.filter((category) =>
  //     category.label.includes(categorySearchQuery),
  //   ).length === 0 && categorySearchQuery !== "";

  // const handleCategorySelect = (value: string) => {
  //   form.setValue("category", value);
  //   setIsCategoryPopoverOpen(false);
  // };

  // const onAddNewCategoryHandler = () => {
  //   setTransactionCategories([
  //     ...transactionCategories,
  //     { label: categorySearchQuery, value: categorySearchQuery },
  //   ]);
  //   form.setValue("category", categorySearchQuery);
  //   setCategorySearchQuery("");
  //   setIsCategoryPopoverOpen(false);
  // };

  const onSubmit = async (data: z.infer<typeof createTransactionSchema>) => {
    const transaction = await api.transaction.addTransaction
      .mutate(data)
      .catch(() => ({ success: false as const }));

    if (!transaction.success) {
      return toast({
        title: "Failed to add your account",
        description: "Please try again later.",
      });
    }

    toast({
      title: "Account added with success!",
      description: "Your account was added with success.",
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* Bank Account Field */}
        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Bank Account</FormLabel>
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
                        ? assetsAndAccounts.find(
                            (data) => data.value === field.value,
                          )?.label
                        : "Select bank account"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search bank accounts..."
                      className="h-9"
                    />
                    <CommandEmpty>No bank accounts found.</CommandEmpty>
                    <CommandGroup>
                      {assetsAndAccounts.map((data) => (
                        <CommandItem
                          value={data.label}
                          key={data.value}
                          onSelect={() => {
                            form.setValue("accountId", data.value);
                          }}
                        >
                          {data.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              data.value === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Purchase Date Field  */}
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
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
        </div>
        {/* Purchase Value Field */}
        <FormField
          control={form.control}
          name="purchaseValue"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) =>
                    handleNumberChange("purchaseValue", e.target.value)
                  }
                  placeholder="Insert the amount..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Category Field */}
        {/* <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover
                open={isCategoryPopoverOpen}
                onOpenChange={() =>
                  setIsCategoryPopoverOpen(!isCategoryPopoverOpen)
                }
              >
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
                        ? transactionCategories.find(
                            (category) => category.value === field.value,
                          )?.label
                        : "Select category"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search categories..."
                      className="h-9"
                      onValueChange={(newValue) =>
                        setCategorySearchQuery(newValue)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          categorySearchQuery !== "" &&
                          noCategoriesFound
                        ) {
                          e.preventDefault();
                          onAddNewCategoryHandler();
                          setCategorySearchQuery("");
                        }
                      }}
                    />
                    {noCategoriesFound ? (
                      <CommandAddNew
                        content={`Add "${categorySearchQuery}" to the list`}
                        onAdd={onAddNewCategoryHandler}
                      />
                    ) : (
                      <CommandGroup>
                        {transactionCategories.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() =>
                              handleCategorySelect(category.value)
                            }
                          >
                            {category.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </form>
    </Form>
  );
};
export default TransactionForm;
