"use server";

// src/utils/sendOnboardingEmail.ts
import WelcomeEmail from "@/apps/www/emails/welcome-email";
import { prisma } from "@/apps/www/lib/db";
import { resend } from "@/apps/www/lib/email";

async function sendOnboardingEmail(email: string, name: string) {
  try {
    const emailResult = await resend.emails.send({
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

    // Update the onboardingEmailSent flag for the user
    await prisma.user.update({
      where: { email },
      data: { onboardingEmailSent: true },
    });
  } catch (error) {
    console.error("Error sending onboarding email:", error);
    throw new Error("Failed to send onboarding email.", error);
  }
}

export default sendOnboardingEmail;
