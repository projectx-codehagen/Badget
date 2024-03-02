import { DocsConfig } from "types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
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
        {
          title: "Edge Store",
          href: "/docs/installation/edge-store",
        },
      ],
    },
    // {
    //   title: "Blog",
    //   items: [
    //     {
    //       title: "Introduction",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Build your own",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Writing Posts",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //   ],
    // },
    // {
    //   title: "Dashboard",
    //   items: [
    //     {
    //       title: "Introduction",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Layouts",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Server Components",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Authentication",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "Database with Drizzle ORM",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //     {
    //       title: "API Routes",
    //       href: "/docs/in-progress",
    //       disabled: true,
    //     },
    //   ],
    // },
  ],
};
