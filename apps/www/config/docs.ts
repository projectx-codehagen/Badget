import { DocsConfig } from "types";

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "Setup",
          href: "/docs/installation",
        },
        {
          title: "Clerk",
          href: "/docs/installation/clerk",
        },
        {
          title: "Planet Scale",
          href: "/docs/installation/planet-scale",
        },
        {
          title: "Resend",
          href: "/docs/installation/resend",
        },
        {
          title: "Stripe",
          href: "/docs/installation/stripe",
        },
      ],
    },
  ],
};
