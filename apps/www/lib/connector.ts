import { IConnectorClient } from "@projectx/connector-core";
import {
  CanonicalAccount,
  CanonicalBalance,
  CanonicalCountry,
  CanonicalIntegration,
  CanonicalResource,
  ConnectorEnv,
  db,
  eq,
  schema,
} from "@projectx/db";

export const connectorFacade = async (env: ConnectorEnv) => {
  // get configured connector based on env
  const connectorWithConfigList = await db
    .select()
    .from(schema.connectorConfig)
    .where(eq(schema.connectorConfig.env, env))
    .leftJoin(
      schema.connector,
      eq(schema.connectorConfig.connectorId, schema.connector.id),
    );

  // dynamically instantiate all of the connectors
  const connectors: IConnectorClient[] = [];
  for (const connectorWithConfig of connectorWithConfigList) {
    if (!connectorWithConfig.connector) continue;

    const Connector = await connectorFactory(
      connectorWithConfig.connector.name.toLowerCase(),
    );

    // maybe delegate this to a factory?
    const connector = new Connector(connectorWithConfig.connectorConfig);
    connector.id = connectorWithConfig.connector.id;
    connector.name = connectorWithConfig.connector.name;
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
  private connectorMap: Map<bigint, IConnectorClient>;

  constructor(...connectors: IConnectorClient[]) {
    connectors.forEach((connector) => {
      this.connectorMap.set(connector.id, connector);
    });
  }

  async getProviders(countries: CanonicalCountry[]) {
    const resultMap = new Map<bigint, CanonicalIntegration[]>();

    for (const [connectorId, connector] of this.connectorMap) {
      const integrationList = await connector.listIntegrations(countries);
      resultMap.set(connectorId, integrationList);
    }

    return resultMap;
  }

  async listResources(): Promise<Map<bigint, CanonicalResource[]>> {
    const resultMap = new Map<bigint, CanonicalResource[]>();

    for (const [connectorId, connector] of this.connectorMap) {
      const resourceList = await connector.listResources();
      resultMap.set(connectorId, resourceList);
    }

    return resultMap;
  }

  async listResourcesAccounts(
    resource: CanonicalResource,
  ): Promise<CanonicalAccount[]> {
    if (!resource.connectorId || !this.connectorMap.has(resource.connectorId)) {
      throw new Error("[www] resource has no connector");
    }

    return await this.connectorMap
      .get(resource.connectorId)!
      .listAccounts(resource);
  }

  async getAccount(account: CanonicalAccount): Promise<CanonicalAccount[]> {
    throw new Error("Not implemented");
  }

  async listBalances(account: CanonicalAccount): Promise<CanonicalBalance[]> {
    throw new Error("Not implemented");
  }

  async listTransactions(account: CanonicalAccount): Promise<void[]> {
    throw new Error("Not implemented");
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
