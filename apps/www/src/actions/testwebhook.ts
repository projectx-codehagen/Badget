// actions/test-webhook.ts
"use server";

import { getCurrentUser } from "@/lib/session";

export async function testWebhook(data: {
  name: string;
  provider: string;
  webhook: string;
}) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    // Send a test message to the specified Discord webhook URL
    if (data.provider.toUpperCase() === "DISCORD") {
      const response = await fetch(data.webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `Test message from ${data.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send Discord notification");
      }
    }

    // Send a test message to the specified Slack webhook URL
    if (data.provider.toUpperCase() === "SLACK") {
      const response = await fetch(data.webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Test message from ${data.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send Slack notification");
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error testing webhook:", error);
    return { success: false, error: error.message };
  }
}
