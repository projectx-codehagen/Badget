import { Institution } from "plaid";

import { CanonicalIntegration } from "@projectx/db";

export const toCanonicalIntegration = (institution: Institution) => {
  return {
    name: institution.name,
    logoUrl: institution.logo, // TODO: upload base64 image to storage server and ref url
    connectorProviderId: institution.institution_id,
  } as CanonicalIntegration;
};
