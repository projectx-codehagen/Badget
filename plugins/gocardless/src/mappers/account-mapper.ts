/// <reference path="../types/nordigen-node.d.ts" />

import { NordigenAccount } from "nordigen-node";

import { CanonicalAccount } from "@projectx/db";

export const toCanonicalAccount = (account: NordigenAccount) => {
  return {
    name: account.name,
    originalPayload: account,
  } as CanonicalAccount;
};
