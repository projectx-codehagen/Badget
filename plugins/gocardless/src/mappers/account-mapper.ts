import { NordigenAccount } from "nordigen-node";

import { CanonicalAccount } from "@projectx/db";

export const toCanonicalAccount = (account: NordigenAccount) => {
  return {
    name: account.name,
    extraData: account,
  } as CanonicalAccount;
};
