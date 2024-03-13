import { type FC } from "react";

import { type AccountType } from "@/components/modals/add-asset-flow";

import { AccountFields } from "./account-fields";
import { AssetFields } from "./asset-fields";
import { InvestmentFormFields } from "./investment-fields";
import { RealEstateFormFields } from "./real-estate-fields";

const generateFormFields = (accountType: AccountType) => {
  switch (accountType) {
    case "real-estate":
      return <RealEstateFormFields />;
    case "investment":
      return <InvestmentFormFields />;
    case "account":
      return <AccountFields />;
    case "asset":
      return <AssetFields />;
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
