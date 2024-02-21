import * as dotenv from "dotenv";

import {
  CanonicalConnector,
  CanonicalConnectorConfig,
  CanonicalIntegration,
  CanonicalResource,
} from "..";
import { ConnectorStatus, ConnectorType } from "../enum";

dotenv.config({ path: "../../../.env.local" });

const connectorsConfigData: CanonicalConnectorConfig[] = [];
const connectorsData: CanonicalConnector[] = [];
const integrationsData: CanonicalIntegration[] = [];
const resourcesData: CanonicalResource[] = [];

// seed connectors
connectorsConfigData.push({
  id: BigInt(1),
  env: "SANDBOX",
  secret: {
    clientId: process.env.PLAID_CLIENT_ID,
    clientSecret: process.env.PLAID_CLIENT_SECRET,
  },
  orgId: "org_",
  connectorId: BigInt(1),
  createdAt: new Date(),
  updatedAt: new Date(),
});

connectorsData.push({
  id: BigInt(1),
  name: "plaid",
  logoUrl:
    "https://pbs.twimg.com/profile_images/1415067514460000256/1iPIdd20_400x400.png",
  status: ConnectorStatus.INACTIVE,
  type: ConnectorType.AGGREGATED,
  createdAt: new Date(),
  updatedAt: new Date(),
});

connectorsConfigData.push({
  id: BigInt(2),
  env: "SANDBOX",
  secret: {
    secretId: process.env.GOCARDLESS_SECRET_ID,
    secretKey: process.env.GOCARDLESS_SECRET_KEY,
  },
  orgId: "org_",
  connectorId: BigInt(2),
  createdAt: new Date(),
  updatedAt: new Date(),
});

connectorsData.push({
  id: BigInt(2),
  name: "gocardless",
  logoUrl: "https://asset.brandfetch.io/idNfPDHpG3/idamTYtkQh.png",
  status: ConnectorStatus.ACTIVE,
  type: ConnectorType.AGGREGATED,
  createdAt: new Date(),
  updatedAt: new Date(),
});

integrationsData.push({
  id: BigInt(1),
  name: "Sandbox",
  connectorId: BigInt(2),
});

resourcesData.push({
  id: BigInt(1),
  originalId: "28ce28fb-877b-4e5c-882a-6066f3f5f728",
  integrationId: BigInt(1),
  userId: "user_",
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const connectorConfigs = connectorsConfigData;
export const connectors = connectorsData;
export const integrations = integrationsData;
export const resources = resourcesData;
