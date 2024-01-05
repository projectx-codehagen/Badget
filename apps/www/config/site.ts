import { SiteConfig } from "@/apps/www/types";

import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Projectx",
  description:
    "Projectx revolutionizes real estate listings with AI-driven efficiency. Streamline your workflow with intuitive tools and seamless integrations. Projectx is tailored for the modern real estate professional who values precision, security, and scalability.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/codehagen",
    github: "https://github.com/meglerhagen",
  },
  mailSupport: "christer@sailsdock.com",
};
