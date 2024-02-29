import { NextRequest, NextResponse } from "next/server";

import { handlePlaidEvent } from "@projectx/connector-plaid";

export async function POST(req: NextRequest) {
  // TODO: verify signature
  const payload = await req.text();

  try {
    await handlePlaidEvent(payload);

    console.log("✅ Handled Plaid Event");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(`❌ Error when handling Plaid Event: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
