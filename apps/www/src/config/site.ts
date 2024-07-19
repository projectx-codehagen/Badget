import type { SiteConfig } from "@/types";
import { env } from "@/env";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "Dingify",
  description:
    "Dingify revolutionizes alearts and notifications for developers and businesses",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/codehagen",
    github: "https://github.com/meglerhagen",
  },
  mailSupport: "christer@sailsdock.com",
};
