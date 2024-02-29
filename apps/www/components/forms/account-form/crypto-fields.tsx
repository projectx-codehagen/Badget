import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CommonAccountFields } from "./common-account-fields";

export const CryptoFormFields = () => {
  const { control } = useFormContext();
  return (
    <>
      {/* Currency Name Field */}
      <div className="grid gap-2">
        <FormField
          control={control}
          name="currencyName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Currency Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Currency Name..." />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {/* Wallet Address */}
      <div className="grid gap-2">
        <FormField
          control={control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Wallet Address..." />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {/* Conversion Rate (at Purchase) */}
      <div className="grid gap-2">
        <FormField
          control={control}
          name="conversionRate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Conversion Rate</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Conversion Rate..." />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      {/* Current Conversion Rate */}
      <div className="grid gap-2">
        <FormField
          control={control}
          name="currentConversionRate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Current Conversion Rate</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Current Conversion Rate..." />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <CommonAccountFields />
    </>
  );
};
