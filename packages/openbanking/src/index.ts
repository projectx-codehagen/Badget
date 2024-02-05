import {
  CanonicalIntegration,
  ConnectorEnv,
  CountryCode,
  db,
  eq,
  schema,
} from "@projectx/db";

import { PlaidClientAdapter } from "./connectors/plaid";

export * from "./webhooks";
export * from "./connectors/plaid";
export * from "./connectors/gocardless";

export interface IConnectorClient {
  get name(): string;

  // auth can be done here
  preConnect(): Promise<void>;

  // core methods
  listProviders(countryCodes?: CountryCode[]): Promise<CanonicalIntegration[]>;

  listAccounts(): Promise<void>;
  listBalances(): Promise<void>;
  listTransactions(): Promise<void>;

  // post operation and clean can be done here or a noop
  postConnect(): Promise<void>;
}

export const connectorFacade = async (env: ConnectorEnv) => {
  // TODO: get connectorConfigs for env
  const connectorConfigs = await db
    .select()
    .from(schema.connectorConfigs)
    .where(eq(schema.connectorConfigs.env, env));

  // TODO: dynamically instantiate all of the connector adapters
  const plaidConnector = new PlaidClientAdapter(connectorConfigs[0]);
  await plaidConnector.preConnect();

  return new ConnectorFacade(plaidConnector);
};

class ConnectorFacade {
  private connectors: IConnectorClient[];

  constructor(...connectors: IConnectorClient[]) {
    this.connectors = connectors;
  }

  get ids() {
    return this.connectors.map((c) => c.name);
  }

  async getProviders(countryCodes: CountryCode[]) {
    const resultMap = new Map<string, CanonicalIntegration[]>();

    for (const connector of this.connectors) {
      const providers = await connector.listProviders(countryCodes);
      resultMap.set(connector.name, providers);
    }

    return resultMap;
  }
}

export const toConnectorEnv = (env: string) => {
  switch (env) {
    case "production":
      return ConnectorEnv.PRODUCTION;
    case "staging":
    case "test":
      return ConnectorEnv.STAGING;
    case "development":
      return ConnectorEnv.DEVELOPMENT;
    default:
      throw new Error(`[openbanking] unknown env ${env}`);
  }
};
