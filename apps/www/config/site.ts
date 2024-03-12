import { SiteConfig } from "@/types";

import { env } from "@/env";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Badget",
  description:
    "Badget revolutionizes real estate listings with AI-driven efficiency. Streamline your workflow with intuitive tools and seamless integrations. Projectx is tailored for the modern real estate professional who values precision, security, and scalability.",
  url: site_url,
  ogImage: `${site_url}/opengraph-image`,
  links: {
    twitter: "https://twitter.com/codehagen",
    github: "https://github.com/projectx-codehagen/Badget",
  },
  mailSupport: "christer@sailsdock.com",
};
