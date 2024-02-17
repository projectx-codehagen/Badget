import { IConnectorClient } from "@projectx/connector-core";
import {
  CanonicalCountry,
  CanonicalIntegration,
  ConnectorEnv,
  db,
  eq,
  schema,
} from "@projectx/db";

export const connectorFacade = async (env: ConnectorEnv) => {
  // get configured connector based on env
  const connectorsWithConfig = await db
    .select()
    .from(schema.connectorConfigs)
    .where(eq(schema.connectorConfigs.env, env))
    .leftJoin(
      schema.connectors,
      eq(schema.connectorConfigs.connectorId, schema.connectors.id),
    );

  // dynamically instantiate all of the connectors
  const connectors: IConnectorClient[] = [];
  for (const connectorWithConfig of connectorsWithConfig) {
    const ConnectorClientAdapter = await connectorFactory(
      connectorWithConfig.connectors!.name.toLowerCase(),
    );

    // maybe delegate this to a factory?
    const connector = new ConnectorClientAdapter(
      connectorWithConfig.connectorConfigs,
    );
    await connector.preConnect();

    connectors.push(connector);
  }

  // return facade object for simpler unified access
  return new ConnectorFacade(...connectors);
};

const connectorFactory = async (connectorName: string) => {
  switch (connectorName) {
    case "gocardless":
      return (await import(`@projectx/connector-gocardless/server`)).default;
    case "plaid":
      return (await import(`@projectx/connector-plaid/server`)).default;
    default:
      throw new Error(`[www] connector not found: ${connectorName}`);
  }
};

class ConnectorFacade {
  private connectors: IConnectorClient[];

  constructor(...connectors: IConnectorClient[]) {
    this.connectors = connectors;
  }

  async getProviders(countries: CanonicalCountry[]) {
    const resultMap = new Map<string, CanonicalIntegration[]>();

    for (const connector of this.connectors) {
      const providers = await connector.listIntegrations(countries);
      resultMap.set(connector.name, providers);
    }

    return resultMap;
  }
}

// TODO: move to connector-core
export const toConnectorEnv = (env: string) => {
  switch (env) {
    case "production":
      return ConnectorEnv.PRODUCTION;
    case "sandbox":
    case "staging":
    case "test":
      return ConnectorEnv.SANDBOX;
    case "development":
      return ConnectorEnv.DEVELOPMENT;
    default:
      throw new Error(`[openbanking] unknown env ${env}`);
  }
};
