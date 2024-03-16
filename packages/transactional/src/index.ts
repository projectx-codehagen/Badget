import { Resend } from "resend";

export { default as MagicLinkEmail } from "../emails/magic-link-email";
export { default as WelcomeEmail } from "../emails/welcome-email";

export const resend = new Resend(
  "", // INFO: Later we'll use env.RESEND_API_KEY
);
