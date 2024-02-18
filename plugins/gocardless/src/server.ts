import NordigenClient from "nordigen-node";

import { IConnectorClient } from "@projectx/connector-core";
import {
  CanonicalAccount,
  CanonicalBalance,
  CanonicalConnectorConfig,
  CanonicalCountry,
  CanonicalResource,
  CanonicalTransaction,
} from "@projectx/db";

import { toCanonicalAccount } from "./mappers/account-mapper";
import { toCanonicalBalance } from "./mappers/balance-mapper";
import { toGoCardlessCountryCode } from "./mappers/country-code-mapper";
import { toCanonicalIntegration } from "./mappers/institution-mapper";
import { toCanonicalResource } from "./mappers/resource-mapper";
import { toCanonicalTransaction } from "./mappers/transaction-mapper";

const parseSecret = (secret: unknown) => {
  return secret as { secretId: string; secretKey: string };
};

export default class GoCardlessClientAdapter implements IConnectorClient {
  private goCardlessClient: NordigenClient;
  id: string;
  name: string;

  constructor(config: CanonicalConnectorConfig) {
    const secret = parseSecret(config.secret);

    this.goCardlessClient = new NordigenClient({
      secretId: secret.secretId,
      secretKey: secret.secretKey,
      baseUrl: "https://bankaccountdata.gocardless.com/api/v2",
    });
  }

  async preConnect() {
    this.goCardlessClient.token = (
      await this.goCardlessClient.generateToken()
    ).access;
  }

  async postConnect() {
    // no-op
    return await Promise.resolve();
  }

  async listIntegrations(countryCodes: CanonicalCountry[]) {
    const providerPromiseList = countryCodes
      .map(toGoCardlessCountryCode)
      .map((countryCode) =>
        this.goCardlessClient.institution.getInstitutions({
          country: countryCode,
        }),
      );

    const providerList = await Promise.all(providerPromiseList);
    return providerList.flat().map(toCanonicalIntegration);
  }

  createResource(): Promise<CanonicalResource> {
    throw new Error("Method not implemented.");
  }

  async listResources(): Promise<CanonicalResource[]> {
    // TODO: manage paginated result
    const requisitionList =
      await this.goCardlessClient.requisition.getRequisitions({
        limit: 100,
        offset: 0,
      });

    return requisitionList.results.map(toCanonicalResource);
  }

  async listAccounts(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalAccount>> {
    const result = new Map<string, CanonicalAccount>();

    const requisition =
      await this.goCardlessClient.requisition.getRequisitionById(
        resource.externalId,
      );

    for (const accountId of requisition.accounts) {
      const accountDetails = await this.goCardlessClient
        .account(accountId)
        .getDetails();

      result.set(accountId, {
        externalId: accountId,
        ...toCanonicalAccount(accountDetails.account),
      });
    }

    return result;
  }

  async listBalances(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalBalance[]>> {
    const result = new Map<string, CanonicalBalance[]>();

    const requisition =
      await this.goCardlessClient.requisition.getRequisitionById(
        resource.externalId,
      );

    for (const accountId of requisition.accounts) {
      const response = await this.goCardlessClient
        .account(accountId)
        .getBalances();

      result.set(accountId, response.balances.map(toCanonicalBalance));
    }

    return result;
  }

  async listTransactions(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalTransaction[]>> {
    const result = new Map<string, CanonicalTransaction[]>();

    const requisition =
      await this.goCardlessClient.requisition.getRequisitionById(
        resource.externalId,
      );

    for (const accountId of requisition.accounts) {
      const response = await this.goCardlessClient
        .account(accountId)
        .getTransactions({});

      result.set(
        accountId,
        response.transactions.booked.map(toCanonicalTransaction), // TODO: persiste pending transaction too
      );
    }

    return result;
  }
}
