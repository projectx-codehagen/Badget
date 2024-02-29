import { eq, schema } from "@projectx/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const integrationsRouter = createTRPCRouter({
  listIntegrations: publicProcedure.query(async (opts) => {
    const integrations = await opts.ctx.db
      .select({
        id: schema.integration.id,
        name: schema.integration.name,
        logoUrl: schema.integration.logoUrl,
        connector: {
          name: schema.connector.name,
        },
      })
      .from(schema.integration)
      .leftJoin(
        schema.connector,
        eq(schema.integration.connectorId, schema.connector.id),
      );

    return integrations;
  }),
});
