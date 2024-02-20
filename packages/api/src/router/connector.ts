import { eq, schema } from "@projectx/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const connectorRouter = createTRPCRouter({
  listConnectors: protectedProcedure.query(async (opts) => {
    const connectorsWithConfig = await opts.ctx.db
      .select({
        id: schema.connector.id,
        name: schema.connector.name,
        logoUrl: schema.connector.logoUrl,
        status: schema.connector.status,
        connectorConfig: {
          env: schema.connectorConfig.env,
          secret: schema.connectorConfig.secret,
        },
      })
      .from(schema.connector)
      .leftJoin(
        schema.connectorConfig,
        eq(schema.connector.id, schema.connectorConfig.connectorId),
      );

    return connectorsWithConfig;
  }),
});
