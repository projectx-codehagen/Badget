import { NextRequest, NextResponse } from "next/server";

import { UpdateIntegrationsCronPayload } from "@projectx/connector-core";
import { db, schema, sql } from "@projectx/db";

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
  const resourceMap = await facade.listResources();

  for (let [connectorId, resourceList] of resourceMap.entries()) {
    console.debug(
      `[openbanking] ${resourceList.length} resources for connector-${connectorId}`,
    );

    for (let resource of resourceList) {
      const resourceAccountList = await facade.listResourcesAccounts(resource);

      for (let resourceAccount of resourceAccountList) {
        const account = await facade.getAccount(resourceAccount);
        const balanceList = await facade.listBalances(resourceAccount);
        const transactionList = await facade.listTransactions(resourceAccount);

        await db.transaction(async (tx) => {
          await tx.insert(schema.account).values(account);
          await tx
            .insert(schema.balance)
            .values(balanceList)
            .onDuplicateKeyUpdate({
              set: {
                amount: sql`amount`,
                date: sql`date`,
              },
            });
          await tx
            .insert(schema.transaction)
            .values(transactionList)
            .onDuplicateKeyUpdate({
              set: {
                amount: sql`amount`,
                date: sql`date`,
                description: sql`description`,
              },
            });
        });
      }
    }
  }

  console.log("✅ Openbanking Webhook Processed");
};
