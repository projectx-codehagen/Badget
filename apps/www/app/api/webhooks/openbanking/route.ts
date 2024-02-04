import { NextRequest, NextResponse } from "next/server";

import { handleEvent } from "@projectx/openbanking/webhooks";

export async function POST(req: NextRequest) {
  // TODO: verify signature
  const payload = await req.text();

  try {
    await handleEvent(payload);

    console.log("✅ Handled Openbanking Event");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(`❌ Error when handling Openbanking Event: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
