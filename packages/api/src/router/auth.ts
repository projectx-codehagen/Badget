import { clerkClient } from "@clerk/nextjs";

import { eq, schema } from "@projectx/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  mySubscription: protectedProcedure.query(async (opts) => {
    const customer = await opts.ctx.db
      .select({ plan: schema.customer.plan, endsAt: schema.customer.endsAt })
      .from(schema.customer)
      .where(eq(schema.customer.clerkUserId, opts.ctx.auth.userId));

    if (!customer?.[0]) return null;

    return {
      plan: customer[0].plan ?? null,
      endsAt: customer[0].endsAt ?? null,
    };
  }),
  listOrganizations: protectedProcedure.query(async (opts) => {
    const memberships = await clerkClient.users.getOrganizationMembershipList({
      userId: opts.ctx.auth.userId,
    });

    return memberships.map(({ organization }) => ({
      id: organization.id,
      name: organization.name,
      image: organization.imageUrl,
    }));
  }),
});
