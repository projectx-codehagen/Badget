import {
  CanonicalIntegration,
  ConnectorEnv,
  db,
  eq,
  schema,
} from "@projectx/db";

export * from "./webhooks";
export * from "./connectors/plaid";
export * from "./connectors/gocardless";

export interface IConnectorClient {
  get name(): string;

  // auth can be done here
  preConnect(): Promise<void>;

  // core methods
  listProviders(countryCodes?: string[]): Promise<CanonicalIntegration[]>;
  listAccounts(): Promise<void>;
  listBalances(): Promise<void>;
  listTransactions(): Promise<void>;

  // post operation and clean can be done here or a noop
  postConnect(): Promise<void>;
}

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
    const ConnectorClientAdapter = (
      await import(
        `./connectors/${connectorWithConfig.connectors!.name.toLowerCase()}/server.ts`
      )
    ).default satisfies IConnectorClient;

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

class ConnectorFacade {
  private connectors: IConnectorClient[];

  constructor(...connectors: IConnectorClient[]) {
    this.connectors = connectors;
  }

  async getProviders(countryCodes: string[]) {
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
