import { eq } from "drizzle-orm";

import { db, ItemInsert, schema, TransactionInsert } from "..";

export const findItemByExternalId = async (externalId: string) => {
  const items = await db
    .select()
    .from(schema.item)
    .where(eq(schema.item.externalId, externalId))
    .execute();

  // since Plaid item IDs are unique, this query will never return more than one row.
  return items[0];
};

export const updateItemByExternalId = async (
  externalId: string,
  item: Partial<ItemInsert>,
) => {
  return await db
    .update(schema.item)
    .set(item)
    .where(eq(schema.item.externalId, externalId))
    .execute();
};

// Transactions CRUD
export const upsertTransactions = async (transactions: TransactionInsert[]) => {
  await db.transaction(async (tx) => {
    for (const transaction of transactions) {
      await tx
        .insert(schema.transaction)
        .values(transaction)
        .onDuplicateKeyUpdate({
          set: transaction,
        });
    }
  });
};
