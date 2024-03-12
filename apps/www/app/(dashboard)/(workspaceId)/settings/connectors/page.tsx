import { api } from "@/trpc/server";

import { ConnectorCards } from "./connector-cards";

export default async function SettingsProfilePage() {
  const connectorsWithConfig = await api.connectors.listConnectors.query();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configured Connectors</h3>
        <p className="text-sm text-muted-foreground">Available connectors.</p>
      </div>
      <section className="flex gap-6">
        <ConnectorCards connectorsWithConfig={connectorsWithConfig} />
      </section>
    </div>
  );
}
