import { CanonicalIntegration, ConnectorEnv } from "@projectx/db";

import { PlaidClientAdapter } from "./connectors/plaid";

export * from "./webhooks";
export * from "./connectors/plaid";
export * from "./connectors/gocardless";

export interface IConnectorClient {
  get name(): string;

  // auth can be done here
  preConnect(): Promise<void>;

  // core methods
  listProviders(): Promise<CanonicalIntegration[]>;

  listAccounts(): Promise<void>;
  listBalances(): Promise<void>;
  listTransactions(): Promise<void>;

  // post operation and clean can be done here or a noop
  postConnect(): Promise<void>;
}

export const connectorFacade = async (_env: ConnectorEnv) => {
  // TODO: get active connectorConfigs for env

  // instantiate all of the connector adapters
  const plaidConnector = new PlaidClientAdapter();
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

  async getProviders() {
    const resultMap = new Map<string, CanonicalIntegration[]>();

    for (const connector of this.connectors) {
      const providers = await connector.listProviders();
      resultMap.set(connector.name, providers);
    }

    return resultMap;
  }
}
