import { eq, schema } from "@projectx/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const connectorRouter = createTRPCRouter({
  listConnectors: protectedProcedure.query(async (opts) => {
    const connectorsWithConfig = await opts.ctx.db
      .select({
        id: schema.connectors.id,
        name: schema.connectors.name,
        logoUrl: schema.connectors.logoUrl,
        status: schema.connectors.status,
        connectorConfig: {
          env: schema.connectorConfigs.env,
          secret: schema.connectorConfigs.secret,
        },
      })
      .from(schema.connectors)
      .leftJoin(
        schema.connectorConfigs,
        eq(schema.connectors.id, schema.connectorConfigs.connectorId),
      );

    return connectorsWithConfig;
  }),
});
