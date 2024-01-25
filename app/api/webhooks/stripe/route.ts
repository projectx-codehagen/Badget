import { headers } from "next/headers";
import Stripe from "stripe";

import { env } from "@/env.mjs";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  console.log("Received Stripe event:", event);

  // Handling checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Session details:", session);

    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );
      console.log("Subscription details for session completed:", subscription);

      const updatedUser = await prisma.user.update({
        where: {
          id: session?.metadata?.userId,
        },
        data: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
        select: {
          stripeSubscriptionId: true,
          stripeCustomerId: true,
          stripePriceId: true,
          stripeCurrentPeriodEnd: true,
        },
      });

      console.log(
        "User updated successfully for session completed:",
        updatedUser,
      );
    } catch (error) {
      console.error("Error updating user for session completed:", error);
    }
  }

  // Handling invoice.payment_succeeded event
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    console.log("Invoice details:", invoice);

    try {
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
      );
      console.log("Subscription details for payment succeeded:", subscription);

      const updatedUser = await prisma.user.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000,
          ),
        },
        select: {
          stripePriceId: true,
          stripeCurrentPeriodEnd: true,
        },
      });

      console.log(
        "User updated successfully for payment succeeded:",
        updatedUser,
      );
    } catch (error) {
      console.error("Error updating user for payment succeeded:", error);
    }
  }

  return new Response(null, { status: 200 });
}
