import { NordigenAccount } from "nordigen-node";

import { CanonicalAccount } from "@projectx/db";

export const toCanonicalAccount = (account: NordigenAccount) => {
  return {
    name: account.name,
    type: account.cashAccountType,
    subType: account.product,
  } as CanonicalAccount;
};
