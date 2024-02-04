import { CanonicalInstitution, ConnectorEnv } from "@projectx/db";

import { PlaidClientAdapter } from "./connectors/plaid";

export * from "./webhooks";

export interface IConnectorClient {
  // auth can be done here
  preConnect(): Promise<void>;

  // core methods
  listProviders(): Promise<CanonicalInstitution[]>; // TODO: create CanonicalProvider

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

  get connectorsCount() {
    return this.connectors.length;
  }

  async getProviders() {
    const promises = this.connectors.map((connector) =>
      connector.listProviders(),
    );

    const settledResults = (await Promise.allSettled(promises)) as {
      status: "fulfilled" | "rejected";
      value: CanonicalInstitution[];
    }[];

    return settledResults
      .filter((sr) => sr.status === "fulfilled")
      .map((sr) => sr.value)
      .flat();
  }
}
