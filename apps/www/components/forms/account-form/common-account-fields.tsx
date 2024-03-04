import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
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

export const CommonAccountFields = () => {
  const { control } = useFormContext();
  return (
    <>
      {/* Purchase Date Field  */}
      <div className="grid gap-2">
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
      </div>
      {/* Purchase Value Field */}
      <FormField
        control={control}
        name="purchaseValue"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Purchase Value</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Purchase Value..." />
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
              <Input {...field} placeholder="Current Value..." />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
