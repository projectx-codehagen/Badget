import { ConnectorEnv } from "@projectx/db";

import { connectorFacade } from ".";

export async function handleEvent(_payload: string) {
  const facade = await connectorFacade(ConnectorEnv.STAGING); // TODO: use current env

  const providers = await facade.getProviders();
  console.debug(`[openbanking] Found ${providers.length} providers`);

  // TODO: upsert providers based on available ones

  // TODO: upsert integration based on available ones

  console.log("✅ Openbanking Webhook Processed");
}
