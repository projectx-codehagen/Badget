import { NordigenBookedTransaction } from "nordigen-node";

import { CanonicalTransaction } from "@projectx/db";

export const toCanonicalTransaction = (
  transaction: NordigenBookedTransaction,
) => {
  return {
    amount: transaction.transactionAmount.amount,
    currencyIso: transaction.transactionAmount.currency,
    date: new Date(transaction.valueDate),
    description: transaction.remittanceInformationUnstructured,
  } as CanonicalTransaction;
};
