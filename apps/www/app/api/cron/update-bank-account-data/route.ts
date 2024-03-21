import { NextRequest, NextResponse } from "next/server";

import { db, schema, sql } from "@projectx/db";

import { env } from "@/env";
import { BankingData, connectorFacade, toConnectorEnv } from "@/lib/connector";

export async function POST(req: NextRequest) {
  // get the bearer token from the header
  const authToken = (req.headers.get("authorization") || "")
    .split("Bearer ")
    .at(1);

  // if not found OR the bearer token does NOT equal the CRON_SECRET
  // TODO: Later we'll add the 2nd part of condition authToken !== env.CRON_SECRET
  if (!authToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  try {
    console.log("○ [openbanking]: Handling cron bank-account-data");

    await handleEvent();

    console.log("✓ [openbanking]: Handled cron bank-account-data");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(`❌ [openbanking] Error when handling cron: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

const handleEvent = async () => {
  const facade = await connectorFacade(toConnectorEnv(env.NODE_ENV));
  const resourceList = await facade.listResourcesFromDB();
  console.debug(`○ [openbanking] ${resourceList.length} resources`);

  const promises = resourceList.map(({ integration, ...resource }) => {
    return facade.listBankingAccountData(resource, integration.connectorId);
  });

  const results = await Promise.allSettled(promises);
  // TODO: log errors
  const errors = results.filter((r) => r.status === "rejected");
  const successes = results.filter(
    (r): r is PromiseFulfilledResult<BankingData[]> => r.status === "fulfilled",
  );

  const dbTransactionPromiseList = successes
    .map((success) => success.value.map(upsertBankAccountData))
    .flat();

  // TODO: use Promise.allSettled to better log
  await Promise.all(dbTransactionPromiseList);
};

const upsertBankAccountData = async (data: BankingData) => {
  await db.transaction(async (tx) => {
    const accountQuery = await tx
      .insert(schema.account)
      .values(data.account)
      .onDuplicateKeyUpdate({ set: { name: sql`name` } });

    await tx
      .insert(schema.balance)
      .values(
        data.balances.map((balance) => {
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
        data.transactions.map((transaction) => {
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
};
