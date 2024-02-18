import { NordigenBookedTransaction } from "nordigen-node";

import { CanonicalTransaction } from "@projectx/db";

export const toCanonicalTransaction = (
  transaction: NordigenBookedTransaction,
) => {
  return {
    amount: transaction.transactionAmount.amount,
    // TODO: find a smart way to map this -> currencyId: transaction.transactionAmount.currency,
    date: transaction.valueDate,
    description: transaction.remittanceInformationUnstructured,
  } as CanonicalTransaction;
};
