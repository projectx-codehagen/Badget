import { type FC } from "react";
import {
  Bitcoin,
  Building,
  Car,
  GitGraph,
  MoreHorizontal,
  Vault,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { type AccountTypeInfo } from "..";

interface AccountTypeSelectionProps {
  onSelectAccountType: (accountType: AccountTypeInfo) => void;
}

const accountTypes: AccountTypeInfo[] = [
  {
    title: "account",
    description: "Add details about your account.",
    type: "account",
    value: "account",
    label: "Account",
    Icon: Vault,
  },
  {
    title: "real estate",
    description: "Add details about your real estate.",
    type: "real-estate",
    value: "real-estate",
    label: "Real Estate",
    Icon: Building,
  },
  {
    title: "investment account",
    description: "Add details about your investment account.",
    type: "investment",
    value: "investment",
    label: "Investment",
    Icon: GitGraph,
  },
  {
    title: "generic asset",
    description: "Add details about your asset.",
    type: "asset",
    value: "asset",
    label: "Asset",
    Icon: MoreHorizontal,
  },
];

export const AccountTypeSelection: FC<AccountTypeSelectionProps> = ({
  onSelectAccountType,
}) => {
  const handleSelectAccountType = (selectedValue: string) => {
    const selectedAccountType = accountTypes.find(
      (type) => type.value === selectedValue,
    );
    if (selectedAccountType) {
      onSelectAccountType(selectedAccountType);
    }
  };
  return (
    <RadioGroup
      className="mb-4 grid grid-cols-2 gap-4"
      onValueChange={(accountType) => handleSelectAccountType(accountType)}
    >
      {accountTypes.map((accountType) => (
        <div key={accountType.value}>
          <RadioGroupItem
            value={accountType.value}
            id={accountType.value}
            className="peer sr-only"
          />
          <Label
            htmlFor={accountType.value}
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
          >
            <accountType.Icon className="mb-3 h-6 w-6" />
            {accountType.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
