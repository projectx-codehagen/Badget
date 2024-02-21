import {
  Configuration,
  CountryCode,
  InstitutionsGetRequest,
  PlaidApi,
} from "plaid";

import { IConnectorClient } from "@projectx/connector-core";
import {
  CanonicalAccount,
  CanonicalBalance,
  CanonicalConnectorConfig,
  CanonicalCountry,
  CanonicalIntegration,
  CanonicalResource,
  CanonicalTransaction,
} from "@projectx/db";

import { toPlaidCountryCode } from "./mappers/country-code-mapper";
import { toPlaidEnvironment } from "./mappers/env-mapper";
import { toCanonicalIntegration } from "./mappers/institution-mapper";

const parseSecret = (secret: unknown) => {
  return secret as { clientId: string; clientSecret: string };
};

export default class PlaidClientAdapter implements IConnectorClient {
  private plaidClient: PlaidApi;
  id: bigint = BigInt(0);
  name: string = "";

  constructor(config: CanonicalConnectorConfig) {
    const secret = parseSecret(config.secret);
    const configuration = new Configuration({
      basePath: toPlaidEnvironment(config.env),
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": secret.clientId,
          "PLAID-SECRET": secret.clientSecret,
        },
      },
    });

    this.plaidClient = new PlaidApi(configuration);
  }
  listIntegrations(
    countries?: CanonicalCountry[],
  ): Promise<CanonicalIntegration[]> {
    throw new Error("Method not implemented.");
  }

  createResource(): Promise<CanonicalResource> {
    throw new Error("Method not implemented.");
  }

  listResources(): Promise<CanonicalResource[]> {
    throw new Error("Method not implemented.");
  }

  listAccounts(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalAccount>> {
    throw new Error("Method not implemented.");
  }

  listBalances(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalBalance[]>> {
    throw new Error("Method not implemented.");
  }

  listTransactions(
    resource: CanonicalResource,
  ): Promise<Map<string, CanonicalTransaction[]>> {
    throw new Error("Method not implemented.");
  }

  preConnect() {
    // no-op
    return Promise.resolve();
  }

  async listProviders(countryCodes: string[]) {
    let result: CanonicalIntegration[] = [];

    let notCompleted = true;
    while (notCompleted) {
      let offset = 0;
      const request: InstitutionsGetRequest = {
        count: 500,
        offset,
        country_codes: countryCodes.map(toPlaidCountryCode),
      };

      try {
        // TODO: handle rate limit
        const response = await this.plaidClient.institutionsGet(request);
        const institutions = response.data.institutions;
        offset += institutions.length;
        notCompleted = response.data.total < offset;
        result = [...institutions.map(toCanonicalIntegration)];
      } catch (error) {
        // Handle error
        console.error(error);
        notCompleted = false;
      }
    }

    return result;
  }

  postConnect() {
    // no-op
    return Promise.resolve();
  }
}
