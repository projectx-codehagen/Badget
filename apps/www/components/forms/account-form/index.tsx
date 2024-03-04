import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";

import { type FormFields } from "@/hooks/use-flow-modal-state";
import { Form } from "@/components/ui/form";
import { type AccountType } from "@/components/modals/add-asset-flow";

import { CarFormFields } from "./car-fields";
import { CryptoFormFields } from "./crypto-fields";
import { InputFormFields } from "./input-fields";
import { InvestmentFormFields } from "./investment-fields";
import { MiscFormFields } from "./misc-fields";
import { RealEstateFormFields } from "./real-estate-fields";

const generateFormFields = (accountType: AccountType) => {
  switch (accountType) {
    case "real-estate":
      return <RealEstateFormFields />;
    case "crypto":
      return <CryptoFormFields />;
    case "investment":
      return <InvestmentFormFields />;
    case "input":
      return <InputFormFields />;
    case "car":
      return <CarFormFields />;
    case "misc":
      return <MiscFormFields />;
    default:
      return null;
  }
};

interface AccountFormProps {
  type: AccountType;
  form: UseFormReturn<FormFields>;
}

export const AccountForm: FC<AccountFormProps> = ({ type, form }) => {
  return (
    <Form {...form}>
      <form className="space-y-3">{generateFormFields(type)}</form>
    </Form>
  );
};
