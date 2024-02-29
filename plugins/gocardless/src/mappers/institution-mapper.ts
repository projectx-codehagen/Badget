/// <reference path="../types/nordigen-node.d.ts" />

import { NordigenInstitution } from "nordigen-node";

import { CanonicalIntegration } from "@projectx/db";

export const toCanonicalIntegration = (institution: NordigenInstitution) => {
  return {
    name: institution.name,
    logoUrl: institution.logo, // TODO: upload base64 image to storage server and ref url
    connectorProviderId: institution.id,
  } as CanonicalIntegration;
};
