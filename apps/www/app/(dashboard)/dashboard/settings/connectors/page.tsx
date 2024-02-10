
import { ConnectorCards } from "./connector-cards";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configured Connectors</h3>
        <p className="text-sm text-muted-foreground">Available connectors.</p>
      </div>
      <ConnectorCards />
    </div>
  );
}
