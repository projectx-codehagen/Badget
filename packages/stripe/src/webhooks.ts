import { clerkClient } from "@clerk/nextjs";
import type Stripe from "stripe";

import { db, eq, genId, schema } from "@projectx/db";

import { stripe } from ".";
import { stripePriceToSubscriptionPlan } from "./plans";

export async function handleEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (typeof session.subscription !== "string") {
        throw new Error("Missing or invalid subscription id");
      }
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription,
      );

      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;
      const { userId, organizationName } = subscription.metadata;

      if (!userId) {
        throw new Error("Missing user id");
      }

      const customer = await db
        .select({ id: schema.customer.id })
        .from(schema.customer)
        .where(eq(schema.customer.stripeId, customerId))
        .execute();

      const subscriptionPlan = stripePriceToSubscriptionPlan(
        subscription.items.data[0]?.price.id,
      );

      /**
       * User is already subscribed, update their info
       */
      if (customer[0]) {
        return await db
          .update(schema.customer)
          .set({
            stripeId: customerId,
            subscriptionId: subscription.id,
            paidUntil: new Date(subscription.current_period_end * 1000),
            plan: subscriptionPlan?.key,
          })
          .where(eq(schema.customer.id, customer[0].id))
          .execute();
      }

      /**
       * User is not subscribed, create a new customer and org
       */
      const organization = await clerkClient.organizations.createOrganization({
        createdBy: userId,
        name: organizationName!,
      });

      // TODO: SET ACTIVE ORG WHEN CLERK CAN BOTHER TO LET ME DO TAHT SERVERSIDE!!!

      await db
        .insert(schema.customer)
        .values({
          clerkUserId: userId,
          clerkOrganizationId: organization.id,
          stripeId: customerId,
          subscriptionId: subscription.id,
          plan: subscriptionPlan?.key,
          paidUntil: new Date(subscription.current_period_end * 1000),
          endsAt: new Date(subscription.current_period_end * 1000),
        })
        .execute();
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object;
      if (typeof invoice.subscription !== "string") {
        throw new Error("Missing or invalid subscription id");
      }
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription,
      );

      const subscriptionPlan = stripePriceToSubscriptionPlan(
        subscription.items.data[0]?.price.id,
      );

      await db
        .update(schema.customer)
        .set({
          plan: subscriptionPlan?.key,
          paidUntil: new Date(subscription.current_period_end * 1000),
        })
        .where(eq(schema.customer.subscriptionId, subscription.id))
        .execute();
      break;
    }
    case "invoice.payment_failed": {
      // TODO: Handle failed payments
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      await db
        .update(schema.customer)
        .set({
          subscriptionId: null,
          plan: "FREE",
          paidUntil: null,
        })
        .where(eq(schema.customer.stripeId, customerId))
        .execute();
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      const subscriptionPlan = stripePriceToSubscriptionPlan(
        subscription.items.data[0]?.price.id,
      );

      await db
        .update(schema.customer)
        .set({
          plan: subscriptionPlan?.key,
          paidUntil: new Date(subscription.current_period_end * 1000),
        })
        .where(eq(schema.customer.stripeId, customerId))
        .execute();
      break;
    }
    default: {
      console.log("🆗 Stripe Webhook Unhandled Event Type: ", event.type);
      return;
    }
  }
  console.log("✅ Stripe Webhook Processed");
}
