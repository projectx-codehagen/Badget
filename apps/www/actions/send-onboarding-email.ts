"use server";

import { resend, WelcomeEmail } from "@projectx/transactional";

async function sendOnboardingEmail(email: string, name: string) {
  await resend.emails.send({
    from: "Badget <onboarding@Resend.com>",
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
}

export default sendOnboardingEmail;
