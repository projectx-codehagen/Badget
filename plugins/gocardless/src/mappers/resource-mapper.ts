/// <reference path="../types/nordigen-node.d.ts" />

import { NordigenRequisition } from "nordigen-node";

import { CanonicalResource } from "@projectx/db";

export const toCanonicalResource = (requisition: NordigenRequisition) => {
  return {
    originalId: requisition.id,
  } as CanonicalResource;
};
