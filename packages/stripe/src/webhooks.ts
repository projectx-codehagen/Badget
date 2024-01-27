import { clerkClient } from "@clerk/nextjs";
import type Stripe from "stripe";

import { db, genId } from "@projectx/db";

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
        .selectFrom("Customer")
        .select("id")
        .where("stripeId", "=", customerId)
        .executeTakeFirst();

      const subscriptionPlan = stripePriceToSubscriptionPlan(
        subscription.items.data[0]?.price.id,
      );

      /**
       * User is already subscribed, update their info
       */
      if (customer) {
        return await db
          .updateTable("Customer")
          .where("id", "=", customer.id)
          .set({
            stripeId: customerId,
            subscriptionId: subscription.id,
            paidUntil: new Date(subscription.current_period_end * 1000),
            plan: subscriptionPlan?.key,
          })
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
        .insertInto("Customer")
        .values({
          id: genId(),
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
        .updateTable("Customer")
        .where("subscriptionId", "=", subscription.id)
        .set({
          plan: subscriptionPlan?.key,
          paidUntil: new Date(subscription.current_period_end * 1000),
        })
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
        .updateTable("Customer")
        .where("stripeId", "=", customerId)
        .set({
          subscriptionId: null,
          plan: "FREE",
          paidUntil: null,
        })
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
        .updateTable("Customer")
        .where("stripeId", "=", customerId)
        .set({
          plan: subscriptionPlan?.key,
          paidUntil: new Date(subscription.current_period_end * 1000),
        })
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
