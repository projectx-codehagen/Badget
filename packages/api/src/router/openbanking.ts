import { eq, or, schema } from "@projectx/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const connectorRouter = createTRPCRouter({
  listAccountsWithBalances: protectedProcedure.query(async (opts) => {
    const accountsWithBalances = await opts.ctx.db.query.account.findMany({
      with: {
        balances: true,
      },
      where: or(
        eq(schema.account.orgId, opts.ctx.auth.orgId || "org_"),
        eq(schema.account.userId, opts.ctx.auth.userId),
      ),
    });

    return accountsWithBalances;
  }),

  listTransactionsWithCategories: protectedProcedure.query(async (opts) => {
    const accountsWithBalances = await opts.ctx.db.query.transaction.findMany({
      with: {
        category: true,
        currency: true,
      },
      where: or(
        eq(schema.account.orgId, opts.ctx.auth.orgId || "org_"),
        eq(schema.account.userId, opts.ctx.auth.userId),
      ),
      limit: 100, // TODO: paginated response
    });

    return accountsWithBalances;
  }),
});
