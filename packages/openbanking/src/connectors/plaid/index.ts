import {
  Configuration,
  CountryCode,
  InstitutionsGetRequest,
  PlaidApi,
  PlaidEnvironments,
} from "plaid";

import { CanonicalInstitution, db, schema } from "@projectx/db";

import { IConnectorClient } from "../..";
import { toCanonicalProvider } from "./mappers/institution-mapper";

export class PlaidClientAdapter implements IConnectorClient {
  private plaidClient: PlaidApi;

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
      basePath: PlaidEnvironments.sandpbox, // TODO: map other envs
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
    let result: CanonicalInstitution[] = [];

    // TODO: loop paginated response
    const request: InstitutionsGetRequest = {
      count: 10,
      offset: 0,
      country_codes: [CountryCode.Us],
    };

    try {
      const response = await this.plaidClient.institutionsGet(request);
      const institutions = response.data.institutions;
      result = [...institutions.map(toCanonicalProvider)];
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
