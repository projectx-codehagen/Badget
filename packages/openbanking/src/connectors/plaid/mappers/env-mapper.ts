import { PlaidEnvironments } from "plaid";

import { ConnectorEnv } from "@projectx/db";

export const toPlaidEnvironment = (env: ConnectorEnv) => {
  switch (env) {
    case ConnectorEnv.DEVELOPMENT:
      return PlaidEnvironments.development;
    case ConnectorEnv.SANDBOX:
      return PlaidEnvironments.sandbox;
    case ConnectorEnv.PRODUCTION:
      return PlaidEnvironments.production;
    default:
      throw new Error(`[plaid] unknown env ${env}`);
  }
};
