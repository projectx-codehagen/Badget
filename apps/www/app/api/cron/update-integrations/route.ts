import { NextRequest, NextResponse } from "next/server";

import { UpdateIntegrationsCronPayload } from "@projectx/connector-core";
import { db, eq, schema, sql } from "@projectx/db";

import { env } from "@/env.mjs";
import { connectorFacade, toConnectorEnv } from "@/lib/connector";

export async function POST(req: NextRequest) {
  // TODO: verify signature

  try {
    const payload =
      (await req.text()) as unknown as UpdateIntegrationsCronPayload;
    console.log(payload);
    await handleEvent(payload);

    console.log("✅ Handled Openbanking Event");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(`❌ Error when handling Openbanking Event: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

const handleEvent = async (_payload: UpdateIntegrationsCronPayload) => {
  const facade = await connectorFacade(toConnectorEnv(env.NODE_ENV));

  // get active country codes
  const countries = await db
    .select()
    .from(schema.country)
    .where(eq(schema.country.active, true));

  // list all providers for connected connectors
  const providersMap = await facade.getProviders(countries);

  // create integrations
  for (let [connectorId, connectorProviders] of providersMap.entries()) {
    console.debug(
      `[openbanking] Upserting ${connectorProviders.length} integrations for connector-${connectorId}`,
    );

    // TODO: handle removed connector providers

    // TODO: handle update only delta

    // upsert integrations
    await db
      .insert(schema.integrations)
      .values(
        connectorProviders.map((cp) => {
          return { connectorId, ...cp };
        }),
      )
      .onDuplicateKeyUpdate({
        set: {
          connectorProviderId: sql`connector_provider_id`,
          connectorId: sql`connector_id`,
          name: sql`values(name)`,
          logoUrl: sql`values(logo_url)`,
          updatedAt: sql`values(updated_at)`,
        },
      });
  }

  console.log("✅ Openbanking Webhook Processed");
};
