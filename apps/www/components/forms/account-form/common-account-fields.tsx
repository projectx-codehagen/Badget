import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn, formatNumberWithSpaces } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CommonAccountFields = () => {
  const { control, setValue } = useFormContext();

  const handleNumberChange = (name: string, value: string) => {
    const unformattedValue = value.replace(/\s/g, "");
    setValue(name, unformattedValue);
  };

  return (
    <>
      {/* Purchase Date Field  */}
      <FormField
        control={control}
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
      {/* Currency Field */}
      <FormField
        control={control}
        name="currency"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Currency</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      {/* Purchase Value Field */}
      <FormField
        control={control}
        name="purchaseValue"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Purchase Value</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={formatNumberWithSpaces(field.value)}
                onChange={(e) =>
                  handleNumberChange("purchaseValue", e.target.value)
                }
                placeholder="Purchase Value..."
              />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Current Value Field */}
      <FormField
        control={control}
        name="currentValue"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Current Value</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={formatNumberWithSpaces(field.value)}
                onChange={(e) =>
                  handleNumberChange("currentValue", e.target.value)
                }
                placeholder="Current Value..."
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
