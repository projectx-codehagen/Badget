import { type FC } from "react";
import {
  Bitcoin,
  Building,
  Car,
  Folder,
  GitGraph,
  MoreHorizontal,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { type AccountTypeInfo } from "..";

interface AccountTypeSelectionProps {
  onSelectAccountType: (accountType: AccountTypeInfo) => void;
}

const accountTypes: AccountTypeInfo[] = [
  {
    title: "Real Estate",
    description: "Add details about your real estate.",
    type: "real-estate",
    value: "real-estate",
    label: "Real Estate",
    Icon: Building,
  },
  {
    title: "Crypto",
    description: "Add details about your crypto.",
    type: "crypto",
    value: "crypto",
    label: "Crypto",
    Icon: Bitcoin,
  },
  {
    title: "Investment",
    description: "Add details about your investment.",
    type: "investment",
    value: "investment",
    label: "Investment",
    Icon: GitGraph,
  },
  {
    title: "Input",
    description: "Add details about your input.",
    type: "input",
    value: "input",
    label: "Input",
    Icon: Folder,
  },
  {
    title: "Car",
    description: "Add details about your car.",
    type: "car",
    value: "car",
    label: "Car",
    Icon: Car,
  },
  {
    title: "Misc",
    description: "Add details about your misc.",
    type: "misc",
    value: "misc",
    label: "Misc",
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
      className="mb-4 grid grid-cols-3 gap-4"
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
