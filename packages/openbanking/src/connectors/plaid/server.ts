import {
  Configuration,
  CountryCode,
  InstitutionsGetRequest,
  PlaidApi,
  PlaidEnvironments,
} from "plaid";

import { CanonicalIntegration, db, eq, schema } from "@projectx/db";

import { IConnectorClient } from "../..";
import { toCanonicalIntegration } from "./mappers/institution-mapper";

export class PlaidClientAdapter implements IConnectorClient {
  private plaidClient: PlaidApi;

  get name() {
    return "plaid";
  }

  async preConnect() {
    const connectorConfig = await db
      .select({
        clientId: schema.connectorConfigs.clientId,
        clientSecret: schema.connectorConfigs.clientSecret,
      })
      .from(schema.connectorConfigs);

    if (!connectorConfig[0]) {
      throw new Error("[plaid] connector configs not found");
    }

    const configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox, // TODO: map other envs
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": connectorConfig[0].clientId,
          "PLAID-SECRET": connectorConfig[0].clientSecret,
        },
      },
    });

    this.plaidClient = new PlaidApi(configuration);
  }

  async listProviders() {
    let result: CanonicalIntegration[] = [];

    // TODO: loop paginated response
    const request: InstitutionsGetRequest = {
      count: 10,
      offset: 0,
      country_codes: [CountryCode.Us],
    };

    try {
      const response = await this.plaidClient.institutionsGet(request);
      const institutions = response.data.institutions;
      result = [...institutions.map(toCanonicalIntegration)];
    } catch (error) {
      // Handle error
      console.error(error);
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
