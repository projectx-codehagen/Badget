"use server";

import { resend, WelcomeEmail } from "@projectx/transactional";

async function sendOnboardingEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "Projectx <onboarding@Resend.com>",
      to: email,
      subject: "Unlock the Future of Real Estate with Projectx!",
      react: WelcomeEmail({
        name: name || "Valued User",
        email: email,
      }),
      headers: {
        "X-Entity-Ref-ID": new Date().getTime() + "",
      },
    });
  } catch (error) {
    console.error("Error sending onboarding email:", error);
    throw new Error("Failed to send onboarding email.", error);
  }
}

export default sendOnboardingEmail;
