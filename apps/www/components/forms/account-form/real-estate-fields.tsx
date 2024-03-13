import { use } from "react";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createRealEstateSchema } from "@projectx/validators";

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
      currentValue: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof createRealEstateSchema>) => {
    const asset = await api.asset.addGenericAsset
      .mutate({
        name: data.name,
        assetType: "REAL ESTATE",
        currencyIso: data.currencyIso,
        amount: data.purchaseValue,
      })
      .catch(() => ({ success: false as const }));

    const realEstate = await api.asset.addRealEstate
      .mutate({
        ...data,
        assetId: BigInt((asset as { assetId: number }).assetId),
      })
      .catch(() => ({ success: false as const }));

    if (!asset.success) {
      return toast({
        title: "Failed to add your property",
        description: "Please try again later.",
      });
    }

    if (asset.success && realEstate.success) {
      toast({
        title: "Property added with success!",
        description: "Your property was added with success.",
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

        <Button type="submit">Add Property</Button>
      </form>
    </Form>
  );
};
