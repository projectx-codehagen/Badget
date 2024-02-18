import { Configuration, InstitutionsGetRequest, PlaidApi } from "plaid";

import { IConnectorClient } from "@projectx/connector-core";
import { CanonicalConnectorConfig, CanonicalIntegration } from "@projectx/db";

import { toPlaidCountryCode } from "./mappers/country-code-mapper";
import { toPlaidEnvironment } from "./mappers/env-mapper";
import { toCanonicalIntegration } from "./mappers/institution-mapper";

const parseSecret = (secret: unknown) => {
  return secret as { clientId: string; clientSecret: string };
};

export default class PlaidClientAdapter implements IConnectorClient {
  private plaidClient: PlaidApi;
  id: string;
  name: string;

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
    countries?: {
      name: string;
      iso: string;
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
      active?: boolean;
    }[],
  ): Promise<
    {
      name: string;
      id?: bigint;
      createdAt?: Date;
      updatedAt?: Date;
      connectorId?: bigint;
      logoUrl?: string;
      connectorProviderId?: string;
    }[]
  > {
    throw new Error("Method not implemented.");
  }
  createResource(): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    integrationId: bigint;
    externalId: string;
  }> {
    throw new Error("Method not implemented.");
  }
  listResources(): Promise<
    {
      id: number;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      integrationId: bigint;
      externalId: string;
    }[]
  > {
    throw new Error("Method not implemented.");
  }
  listAccounts(resource: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    integrationId: bigint;
    externalId: string;
  }): Promise<
    Map<
      string,
      {
        name: string;
        externalId: string;
        resourceId: bigint;
        id?: bigint;
        createdAt?: Date;
        updatedAt?: Date;
        orgId?: string;
        userId?: string;
        extraData?: unknown;
      }
    >
  > {
    throw new Error("Method not implemented.");
  }
  listBalances(resource: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    integrationId: bigint;
    externalId: string;
  }): Promise<
    Map<
      string,
      {
        date: Date;
        type: "AVAILABLE" | "BOOKED" | "EXPECTED";
        accountId: bigint;
        currencyId: bigint;
        amount: number;
        id?: bigint;
        createdAt?: Date;
        updatedAt?: Date;
        extraData?: unknown;
      }[]
    >
  > {
    throw new Error("Method not implemented.");
  }
  listTransactions(resource: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    integrationId: bigint;
    externalId: string;
  }): Promise<
    Map<
      string,
      {
        date: Date;
        description: string;
        accountId: bigint;
        currencyId: bigint;
        amount: number;
        categoryId: bigint;
        id?: bigint;
        createdAt?: Date;
        updatedAt?: Date;
        extraData?: unknown;
      }[]
    >
  > {
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
