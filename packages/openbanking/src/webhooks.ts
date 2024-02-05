import {
  CanonicalCountryCode,
  ConnectorEnv,
  CountryCode,
  db,
  eq,
  inArray,
  schema,
} from "@projectx/db";

import { connectorFacade, toConnectorEnv } from ".";
import { env } from "./env.mjs";

export type IntegrationsWebhookPayload = {
  countryCodes: CountryCode[];
};

export async function handleEvent(_payload: IntegrationsWebhookPayload) {
  const facade = await connectorFacade(toConnectorEnv(env.NODE_ENV));

  // get active country codes
  const countryCodes = await db
    .select({
      code: schema.countryCodes.code,
    })
    .from(schema.countryCodes)
    .where(eq(schema.countryCodes.active, true));

  // list all providers for connected connectors
  const providersMap = await facade.getProviders(
    countryCodes.map((cc) => cc.code),
  );
  console.debug(`[openbanking] Found ${providersMap.size} providers`);

  // get connectors from db
  const connectors = await db
    .select({
      id: schema.connectors.id,
      name: schema.connectors.name,
    })
    .from(schema.connectors)
    .where(inArray(schema.connectors.name, [...providersMap.keys()]));

  // create integrations
  for (let [connectorKey, connectorProviders] of providersMap.entries()) {
    const connectorId = connectors.find((c) => c.name === connectorKey).id;

    // TODO: handle connector not found
    if (!connectorId) {
      console.warn(`[openbanking] Connector '${connectorKey}' not found`);
      continue;
    }

    // TODO: handle removed connector providers

    // TODO: handle update only delta

    // upsert integrations
    const promises = connectorProviders.map((connectorProvider) => {
      return db.transaction(async (tx) => {
        await tx
          .insert(schema.integrations)
          .values({ connectorId, ...connectorProvider })
          .onDuplicateKeyUpdate({ set: { connectorId, ...connectorProvider } });
      });
    });

    await Promise.all(promises);
  }

  console.log("✅ Openbanking Webhook Processed");
}
