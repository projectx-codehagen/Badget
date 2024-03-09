import { type FC } from "react";

import { type AccountType } from "@/components/modals/add-asset-flow";

import { BankAccountFields } from "./bank-account-fields";
import { CarFormFields } from "./car-fields";
import { CryptoFormFields } from "./crypto-fields";
import { InvestmentFormFields } from "./investment-fields";
import { MiscFormFields } from "./misc-fields";
import { RealEstateFormFields } from "./real-estate-fields";

const generateFormFields = (accountType: AccountType) => {
  switch (accountType) {
    // case "real-estate":
    //   return <RealEstateFormFields />;
    // case "crypto":
    //   return <CryptoFormFields />;
    // case "investment":
    //   return <InvestmentFormFields />;
    case "bank-account":
      return <BankAccountFields />;
    // case "car":
    //   return <CarFormFields />;
    // case "misc":
    //   return <MiscFormFields />;
    default:
      return null;
  }
};

interface AccountFormProps {
  type: AccountType;
}

export const AccountForm: FC<AccountFormProps> = ({ type }) => {
  return generateFormFields(type);
};
