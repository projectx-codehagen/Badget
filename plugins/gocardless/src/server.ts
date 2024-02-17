import NordigenClient, { GetDetailsResponse } from "nordigen-node";

import { IConnectorClient } from "@projectx/connector-core";
import {
  CanonicalAccount,
  CanonicalBalance,
  CanonicalConnectorConfig,
  CanonicalCountry,
  CanonicalResource,
} from "@projectx/db";

import { toCanonicalAccount } from "./mappers/account-mapper";
import { toCanonicalBalance } from "./mappers/balance-mapper";
import { toGoCardlessCountryCode } from "./mappers/country-code-mapper";
import { toCanonicalIntegration } from "./mappers/institution-mapper";

const parseSecret = (secret: unknown) => {
  return secret as { secretId: string; secretKey: string };
};

export default class GoCardlessClientAdapter implements IConnectorClient {
  private goCardlessClient: NordigenClient;

  constructor(config: CanonicalConnectorConfig) {
    const secret = parseSecret(config.secret);

    this.goCardlessClient = new NordigenClient({
      secretId: secret.secretId,
      secretKey: secret.secretKey,
      baseUrl: "https://bankaccountdata.gocardless.com/api/v2",
    });
  }

  get name() {
    return "gocardless";
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

  listResources(): Promise<CanonicalResource[]> {
    throw new Error("Method not implemented.");
  }

  async listAccounts(
    _resource: CanonicalResource,
  ): Promise<CanonicalAccount[]> {
    const accountIdList = [""]; // TODO: extract from resource

    const accountPromiseList = accountIdList.map((accountId) => {
      return this.goCardlessClient.account(accountId).getDetails();
    });

    return (await Promise.allSettled(accountPromiseList))
      .filter(assertFulfilled)
      .map((result) => toCanonicalAccount(result.value.account));
  }

  async listBalances(_account: CanonicalAccount): Promise<CanonicalBalance[]> {
    const accountId = ""; // TODO: extract from account

    const response = await this.goCardlessClient
      .account(accountId)
      .getBalances();

    return response.balances.map(toCanonicalBalance);
  }

  async listTransactions(_account: CanonicalAccount): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async getValidAccessToken() {
    // const goCardlessToken = await db
    //   .select({
    //     accessToken: schema.connectorConfigs.access_token,
    //     refreshToken: schema.connectorConfigs.refresh_token,
    //     updatedAt: schema.connectorConfigs.updatedAt
    //   })
    //   .from(schema.connectorConfigs)
    //   .where(eq(schema.connectorConfigs.id, this.config.id));

    // if (!goCardlessToken[0]) {
    //   console.log("no access_token found, generating new one...");
    //   return await this.goCardlessClient.generateToken();
    // }

    // const { accessToken, refreshToken, updatedAt } = goCardlessToken[0];
    // const now = new Date(Date.now());
    // const day = 60 * 60 * 24 * 1000;
    // const accessTokenExpiration = new Date(updatedAt.getTime() + day); // access_token is valid for 24 hours
    // const refreshTokenExpiration = new Date(updatedAt.getTime() + day * 30); // refresk_token is valid for 30 days

    // console.log(updatedAt, now, accessTokenExpiration);

    // if (refreshTokenExpiration > now) {
    //   console.log(
    //     "access_token expired on: " + accessTokenExpiration.toISOString(),
    //   );
    //   return await this.goCardlessClient.generateToken();
    // }

    // if (accessTokenExpiration > now) {
    //   console.log(
    //     "refresh_token expired on: " + refreshTokenExpiration.toISOString(),
    //   );
    //   return await this.goCardlessClient.exchangeToken({ refreshToken });
    // }

    // // NOTE: I don't like returning different types but for now it's fine
    // console.log("access_token found");
    // this.token = accessToken;

    this.token = (await this.goCardlessClient.generateToken()).access;
  }
}

function assertFulfilled(
  item: PromiseSettledResult<GetDetailsResponse>,
): item is PromiseFulfilledResult<GetDetailsResponse> {
  return item.status === "fulfilled";
}
