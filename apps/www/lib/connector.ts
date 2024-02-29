import { IConnectorClient } from "@projectx/connector-core";
import {
  and,
  CanonicalAccount,
  CanonicalBalance,
  CanonicalCountry,
  CanonicalIntegration,
  CanonicalResource,
  CanonicalTransaction,
  ConnectorEnv,
  ConnectorStatus,
  db,
  eq,
  schema,
} from "@projectx/db";

export const connectorFacade = async (env: ConnectorEnv) => {
  // get configured connector based on env
  const connectorWithConfigList = await db
    .select()
    .from(schema.connectorConfig)
    .where(
      and(
        eq(schema.connector.status, ConnectorStatus.ACTIVE),
        eq(schema.connectorConfig.env, env),
      ),
    )
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
  private connectorMap: Map<bigint, IConnectorClient> = new Map<
    bigint,
    IConnectorClient
  >();

  constructor(...connectors: IConnectorClient[]) {
    connectors.forEach((connector) => {
      this.connectorMap.set(connector.id, connector);
    });
  }

  async listIntegrations(countries: CanonicalCountry[]) {
    const resultList: CanonicalIntegration[] = [];
    for (const [connectorId, connector] of this.connectorMap.entries()) {
      const integrationList = await connector.listIntegrations(countries);
      resultList.push(
        ...integrationList.map((integration) => {
          return {
            ...integration,
            connectorId,
          };
        }),
      );
    }

    return resultList;
  }

  async listResourcesFromDB() {
    const resourceWithIntegrationList = await db
      .select()
      .from(schema.resource)
      .leftJoin(
        schema.integration,
        eq(schema.resource.integrationId, schema.integration.id),
      );

    return resourceWithIntegrationList
      .filter(
        (resourceWithIntegration) =>
          resourceWithIntegration.integration !== null,
      )
      .map((resourceWithIntegration) => {
        return {
          ...resourceWithIntegration.resource,
          integration: resourceWithIntegration.integration!,
        };
      });
  }

  async listBankingAccountData(
    resource: CanonicalResource,
    connectorId: bigint,
  ) {
    if (!this.connectorMap.has(connectorId)) {
      throw new Error("[www] connectorId not found");
    }

    const accountMap = await this.connectorMap
      .get(connectorId)!
      .listAccounts(resource);
    const balanceMap = await this.connectorMap
      .get(connectorId)!
      .listBalances(resource);
    const transactionMap = await this.connectorMap
      .get(connectorId)!
      .listTransactions(resource);

    const bankingDataList: BankingData[] = [];

    for (const [accountId, account] of accountMap) {
      const balances = balanceMap.get(accountId) || [];
      const transactions = transactionMap.get(accountId) || [];

      bankingDataList.push({
        account: { ...account, resourceId: resource.id },
        balances,
        transactions,
      });
    }

    return bankingDataList;
  }
}

export type BankingData = {
  account: CanonicalAccount;
  balances: CanonicalBalance[];
  transactions: CanonicalTransaction[];
};

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
