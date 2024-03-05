import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const NameField = () => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-2">
      <FormField
        control={control}
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
    </div>
  );
};
