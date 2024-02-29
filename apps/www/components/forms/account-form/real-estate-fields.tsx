import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CommonAccountFields } from "./common-account-fields";

export const RealEstateFormFields = () => {
  const { control } = useFormContext();
  return (
    <>
      {/* Address Field  */}
      <div className="grid gap-2">
        <FormField
          control={control}
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
          control={control}
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
            control={control}
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
            control={control}
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
      <CommonAccountFields />
    </>
  );
};
