import { currentUser } from "@clerk/nextjs";
// import * as currencies from "@dinero.js/currencies";
import { dinero } from "dinero.js";
import * as z from "zod";

import { eq, schema } from "@projectx/db";
import { PLANS, stripe } from "@projectx/stripe";
import { purchaseOrgSchema } from "@projectx/validators";

import { env } from "../env.mjs";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const stripeRouter = createTRPCRouter({
  createSession: protectedProcedure
    .input(z.object({ planId: z.string() }))
    .mutation(async (opts) => {
      const { userId } = opts.ctx.auth;

      const customer = await opts.ctx.db
        .select({
          id: schema.customer.id,
          plan: schema.customer.plan,
          stripeId: schema.customer.stripeId,
        })
        .from(schema.customer)
        .where(eq(schema.customer.clerkUserId, userId));

      const returnUrl = env.NEXTJS_URL + "/dashboard";

      if (customer?.[0] && customer[0].plan !== "FREE") {
        /**
         * User is subscribed, create a billing portal session
         */
        const session = await stripe.billingPortal.sessions.create({
          customer: customer[0].stripeId,
          return_url: returnUrl,
        });
        return { success: true as const, url: session.url };
      }

      /**
       * User is not subscribed, create a checkout session
       * Use existing email address if available
       */

      const user = await currentUser();
      const email = user?.emailAddresses.find(
        (addr) => addr.id === user?.primaryEmailAddressId,
      )?.emailAddress;

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: email,
        client_reference_id: userId,
        subscription_data: { metadata: { userId } },
        cancel_url: returnUrl,
        success_url: returnUrl,
        line_items: [{ price: PLANS.PRO?.priceId, quantity: 1 }],
      });

      if (!session.url) return { success: false as const };
      return { success: true as const, url: session.url };
    }),

  plans: publicProcedure.query(async () => {
    const proPrice = await stripe.prices.retrieve(PLANS.PRO.priceId);
    const stdPrice = await stripe.prices.retrieve(PLANS.STANDARD.priceId);

    return [
      {
        ...PLANS.STANDARD,
        price: dinero({
          amount: stdPrice.unit_amount!,
          currency: {
            code: "USD",
            base: 10,
            exponent: 2,
          },
          // currencies[stdPrice.currency as keyof typeof currencies] ??
          // currencies.EUR,
        }),
      },
      {
        ...PLANS.PRO,
        price: dinero({
          amount: proPrice.unit_amount!,
          currency: {
            code: "USD",
            base: 10,
            exponent: 2,
          },
          // currencies[proPrice.currency as keyof typeof currencies] ??
          // currencies.EUR,
        }),
      },
    ];
  }),

  purchaseOrg: protectedProcedure
    .input(purchaseOrgSchema)
    .mutation(async (opts) => {
      const { userId } = opts.ctx.auth;
      const { orgName, planId } = opts.input;

      const baseUrl = new URL(opts.ctx.req?.nextUrl ?? env.NEXTJS_URL).origin;

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        client_reference_id: userId,
        subscription_data: {
          metadata: { userId, organizationName: orgName },
        },
        success_url: baseUrl + "/onboarding",
        cancel_url: baseUrl,
        line_items: [{ price: planId, quantity: 1 }],
      });

      if (!session.url) return { success: false as const };
      return { success: true as const, url: session.url };
    }),
});
