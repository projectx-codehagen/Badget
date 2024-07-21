// hooks/use-flow-modal-state.tsx
"use client";

import type {
  AccountType,
  AccountTypeInfo,
} from "@/components/modals/add-asset-flow";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const baseSchema = z.object({
  name: z.string(),
  purchaseDate: z.date(),
  purchaseValue: z.string(),
  currentValue: z.string(),
});

export type BaseFormFields = z.infer<typeof baseSchema>;

const realEstateSchema = baseSchema.extend({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
});

export type RealEstateFormFields = z.infer<typeof realEstateSchema>;

export type FormFields = BaseFormFields | RealEstateFormFields;

const generateFormSchema = (accountType?: AccountType) => {
  switch (accountType) {
    case "real-estate":
      return realEstateSchema;
    default:
      return baseSchema;
  }
};

export function useFlowModalState() {
  const [accountTypeInfo, setAccountTypeInfo] = useState<
    AccountTypeInfo | undefined
  >();
  const currentFormSchema = generateFormSchema(accountTypeInfo?.type);
  const form = useForm<z.infer<typeof currentFormSchema>>({
    resolver: zodResolver(currentFormSchema),
    defaultValues: {
      name: "",
      purchaseDate: new Date(),
      purchaseValue: "",
      currentValue: "",
    },
  });

  const submitFlowData = () => {
    console.log("Submitting flow data");
  };

  return {
    form,
    submitFlowData,
    accountTypeInfo,
    setAccountTypeInfo,
  };
}
