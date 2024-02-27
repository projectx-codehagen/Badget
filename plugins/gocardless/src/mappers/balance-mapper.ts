/// <reference path="../types/nordigen-node.d.ts" />

import { NordigenBalance } from "nordigen-node";

import { CanonicalBalance } from "@projectx/db";

export const toCanonicalBalance = (balance: NordigenBalance) => {
  return {
    amount: balance.balanceAmount.amount,
    currencyIso: balance.balanceAmount.currency,
    date: new Date(balance.referenceDate),
    // type: balance.balanceType,
    // extraData: balance,
  } as CanonicalBalance;
};
