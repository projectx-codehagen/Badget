import { api } from "@/trpc/server";

import { Separator } from "@/components/ui/separator";

import { IntegrationForm } from "./integrations-form";

export default async function SettingsProfilePage() {
  const integrations = await api.integrations.listIntegrations.query();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Bank Account</h3>
        <p className="text-sm text-muted-foreground">
          Connect your bank account
        </p>
      </div>
      <Separator />
      <IntegrationForm integrations={integrations} />
      {/* <BankAccountForm /> */}
    </div>
  );
}
