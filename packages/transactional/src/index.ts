import { Resend } from "resend";

import { env } from "./env.mjs";

export { default as MagicLinkEmail } from "../emails/magic-link-email";
export { default as WelcomeEmail } from "../emails/welcome-email";

export const resend = new Resend(env.RESEND_API_KEY);
