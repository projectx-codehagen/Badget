import {
  CanonicalAccount,
  CanonicalBalance,
  CanonicalCountry,
  CanonicalIntegration,
  CanonicalResource,
} from "@projectx/db";

export interface IConnectorClient {
  get id(): bigint;
  set id(newId: bigint);
  get name(): string;
  set name(newId: string);

  /**
   * @description setup can be done here
   */
  preConnect(): Promise<void>;

  /**
   * @description reardown can be done here
   */
  postConnect(): Promise<void>;

  /**
   * @description list all available providers by country in giving connector
   * @param {CanonicalCountry[]} countries list of countries
   * @returns {Promise<CanonicalIntegration[]>}
   */
  listIntegrations(
    countries?: CanonicalCountry[],
  ): Promise<CanonicalIntegration[]>;

  /**
   * @description create a link to the provider with the connector
   * @returns {Promise<CanonicalResource>}
   */
  createResource(): Promise<CanonicalResource>;

  /**
   * @description list all available resources for given connector
   * @returns {Promise<CanonicalResource[]>}
   */
  listResources(): Promise<CanonicalResource[]>;

  /**
   * @description list all available Accounts for given Resource
   * @param {CanonicalResource} resource connected resource
   * @returns {Promise<CanonicalAccount[]>}
   */
  listAccounts(resource: CanonicalResource): Promise<CanonicalAccount[]>;

  /**
   * @description list all available Balances for given Account
   * @param {CanonicalAccount} account connected account
   * @returns {Promise<CanonicalBalance[]>}
   */
  listBalances(account: CanonicalAccount): Promise<CanonicalBalance[]>;

  /**
   * @description list all available Trasactions for given Account
   * @param {CanonicalAccount} account connected account
   * @returns {Promise<CanonicalAccount[]>}
   */
  listTransactions(account: CanonicalAccount): Promise<void>;
}

export type UpdateIntegrationsCronPayload = {};
