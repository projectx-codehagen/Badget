import { Separator } from "@/components/ui/separator";

import BankAccountForm from "./bank-account-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bank Account</h3>
        <p className="text-sm text-muted-foreground">
          Connect your bank account
        </p>
      </div>
      <Separator />
      <BankAccountForm />
    </div>
  );
}
