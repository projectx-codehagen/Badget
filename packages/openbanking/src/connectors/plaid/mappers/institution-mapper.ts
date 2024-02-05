import { Institution } from "plaid";

import { CanonicalIntegration } from "@projectx/db";

export const toCanonicalIntegration = (institution: Institution) => {
  return {
    name: institution.name,
    logoUrl: institution.logo,
    connectorProviderId: institution.institution_id,
  } as CanonicalIntegration;
};
