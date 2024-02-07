import { NextRequest, NextResponse } from "next/server";

import {
  handleEvent,
  IntegrationsWebhookPayload,
} from "@projectx/openbanking/webhooks";

export async function POST(req: NextRequest) {
  // TODO: verify signature

  try {
    const payload = (await req.text()) as unknown as IntegrationsWebhookPayload;
    console.log(payload);
    await handleEvent(payload);

    console.log("✅ Handled Openbanking Event");
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(`❌ Error when handling Openbanking Event: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
