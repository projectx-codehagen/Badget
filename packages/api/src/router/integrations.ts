import { eq, schema } from "@projectx/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const integrationsRouter = createTRPCRouter({
  listIntegrations: publicProcedure.query(async (opts) => {
    const integrations = await opts.ctx.db
      .select({
        id: schema.integrations.id,
        name: schema.integrations.name,
        logoUrl: schema.integrations.logoUrl,
        connector: {
          name: schema.connectors.name,
        },
      })
      .from(schema.integrations)
      .leftJoin(
        schema.connectors,
        eq(schema.integrations.connectorId, schema.connectors.id),
      );

    return integrations;
  }),
});
