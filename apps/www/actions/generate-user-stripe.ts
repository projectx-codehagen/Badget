"use server";

import { redirect } from "next/navigation";
import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

import { withStripe } from "@projectx/stripe";

import { absoluteUrl } from "@/lib/utils";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(
  priceId: string,
): Promise<responseAction | null> {
  return withStripe<responseAction>(async (stripe) => {
    let redirectUrl = "";

    const user = await currentUser();

    if (!user || !user.emailAddresses) {
      throw new Error("Unauthorized");
    }

    const subscription = await api.auth.mySubscription.query();

    if (subscription?.isPaid && subscription?.stripeId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0]?.emailAddress,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
        },
      });

      redirectUrl = stripeSession.url as string;
    }

    // no revalidatePath because redirect
    redirect(redirectUrl);
  });
}
