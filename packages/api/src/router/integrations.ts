import { eq, schema } from "@projectx/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  listIntegrations: protectedProcedure.query(async (opts) => {
    const integrations = await opts.ctx.db
      .select({
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
