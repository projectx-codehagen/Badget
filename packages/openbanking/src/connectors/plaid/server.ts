import { Configuration, InstitutionsGetRequest, PlaidApi } from "plaid";

import {
  CanonicalConnectorConfig,
  CanonicalIntegration,
  CountryCode,
} from "@projectx/db";

import { IConnectorClient } from "../..";
import { toPlaidCountryCode } from "./mappers/country-code-mapper";
import { toPlaidEnvironment } from "./mappers/env-mapper";
import { toCanonicalIntegration } from "./mappers/institution-mapper";

export default class PlaidClientAdapter implements IConnectorClient {
  private plaidClient: PlaidApi;

  constructor(config: CanonicalConnectorConfig) {
    const configuration = new Configuration({
      basePath: toPlaidEnvironment(config.env),
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": config.clientId,
          "PLAID-SECRET": config.clientSecret,
        },
      },
    });

    this.plaidClient = new PlaidApi(configuration);
  }

  get name() {
    return "plaid";
  }

  preConnect() {
    // no-op
    return Promise.resolve();
  }

  async listProviders(countryCodes: CountryCode[]) {
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

  listAccounts(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  listBalances(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  listTransactions(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  postConnect() {
    // no-op
    return Promise.resolve();
  }
}
