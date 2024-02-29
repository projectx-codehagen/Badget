"use client";

import React from "react";

import { db, eq, schema } from "@projectx/db";

import GoCardlessClientAdapter from "./server";

type GoCardlessLinkProps = {
  institutionId: string;
  workspaceId: string;
};

const GoCardlessLink = ({
  institutionId,
  workspaceId,
}: GoCardlessLinkProps) => {
  // Server Action
  async function createRequisition() {
    "use server";

    const connectors = await db
      .select()
      .from(schema.connector)
      .where(eq(schema.connector.name, "gocardless"))
      .leftJoin(
        schema.connectorConfig,
        eq(schema.connector.id, schema.connectorConfig.connectorId),
      );

    if (!connectors[0]?.connectorConfig) {
      throw new Error(`[gocardless] connector config not found`);
    }

    const client = new GoCardlessClientAdapter(connectors[0].connectorConfig);
    await client.preConnect();
    // TODO: crete requisition and map it to resource
    const resource = await client.createResource();
    await client.postConnect();

    // TODO: navigate to redirectUrl
  }

  return (
    // TODO: use @projectx/ui button
    <button onClick={createRequisition}>Connect bank account</button>
  );
};

export default GoCardlessLink;
