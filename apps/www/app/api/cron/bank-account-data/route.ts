import { NextRequest, NextResponse } from "next/server";

import { db, schema, sql } from "@projectx/db";

import { env } from "@/env.mjs";
import { connectorFacade, toConnectorEnv } from "@/lib/connector";

export async function POST(req: NextRequest) {
  // TODO: verify signature

  try {
    await handleEvent();

    console.log("✅ Handled Openbanking Event");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(`❌ Error when handling Openbanking Event: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

const handleEvent = async () => {
  const facade = await connectorFacade(toConnectorEnv(env.NODE_ENV));
  const resourceMap = await facade.listResourcesFromDB();

  for (let [connectorId, resourceList] of resourceMap.entries()) {
    console.debug(
      `[openbanking] ${resourceList.length} resources for connector-${connectorId}`,
    );

    for (let resource of resourceList) {
      const bankingDataMap = await facade.getBankingAccountData(
        resource,
        connectorId.toString(),
      );

      for (let [_, bankingData] of bankingDataMap) {
        await db.transaction(async (tx) => {
          const accountQuery = await tx
            .insert(schema.account)
            .values({
              ...bankingData.account,
              resourceId: resource.id,
            })
            .onDuplicateKeyUpdate({
              set: {
                name: sql`name`,
              },
            });

          await tx
            .insert(schema.balance)
            .values(
              bankingData.balances.map((balance) => {
                return {
                  ...balance,
                  accountId: BigInt(accountQuery.insertId),
                };
              }),
            )
            .onDuplicateKeyUpdate({
              set: {
                amount: sql`amount`,
                date: sql`date`,
              },
            });
          await tx
            .insert(schema.transaction)
            .values(
              bankingData.transactions.map((transaction) => {
                return {
                  ...transaction,
                  accountId: BigInt(accountQuery.insertId),
                };
              }),
            )
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
