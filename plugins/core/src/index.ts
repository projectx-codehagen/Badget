import {
  CanonicalAccount,
  CanonicalBalance,
  CanonicalCountry,
  CanonicalIntegration,
  CanonicalResource,
  CanonicalTransaction,
} from "@projectx/db";

export interface IConnectorClient {
  id: bigint;
  name: string;

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
   * @returns {Promise<Map<string, CanonicalAccount>>}
   */
  listAccounts(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalAccount>>;

  /**
   * @description list all available Balances for given Account
   * @param {CanonicalResource} resource connected resource
   * @returns {Promise<Map<string, CanonicalBalance[]>>}
   */
  listBalances(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalBalance[]>>;

  /**
   * @description list all available Trasactions for given Account
   * @param {CanonicalResource} resource connected resource
   * @returns {Promise<Map<string, CanonicalTransaction[]>>}
   */
  listTransactions(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalTransaction[]>>;
}

export type UpdateIntegrationsCronPayload = {};
