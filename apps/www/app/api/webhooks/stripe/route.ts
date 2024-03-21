import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { handleEvent, withStripe } from "@projectx/stripe";

import { env } from "@/env";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  return withStripe(async (stripe) => {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET as string,
    );

    await handleEvent(event);

    console.log("✅ Handled Stripe Event", event.type);
    return NextResponse.json({ received: true }, { status: 200 });
  });
}
