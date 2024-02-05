import {
  CanonicalCountryCode,
  ConnectorEnv,
  CountryCode,
  db,
  inArray,
  schema,
} from "@projectx/db";

import { connectorFacade } from ".";

export type IntegrationsWebhookPayload = {
  countryCodes: CountryCode[];
};

export async function handleEvent(_payload: IntegrationsWebhookPayload) {
  const facade = await connectorFacade(ConnectorEnv.STAGING); // TODO: use current env

  const providersMap = await facade.getProviders();
  console.debug(`[openbanking] Found ${providersMap.size} providers`);

  // get connector
  const connectors = await db
    .select({
      id: schema.connectors.id,
      name: schema.connectors.name,
    })
    .from(schema.connectors)
    .where(inArray(schema.connectors.name, [...providersMap.keys()]));

  for (let [connectorKey, connectorProviders] of providersMap.entries()) {
    const connectorId = connectors.find((c) => c.name === connectorKey).id;

    // TODO: handle connector not found
    if (!connectorId) {
      console.warn(`[openbanking] Connector '${connectorKey}' not found`);
      continue;
    }

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
