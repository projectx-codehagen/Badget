import { PropertyConfig } from "@/types";

export const propertyConfig: PropertyConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Summary",
      href: "/",
      icon: "piechart",
    },
    {
      title: "Pictures",
      href: `/pictures`,
      icon: "media",
    },
    {
      title: "Appraisal Report",
      href: "/report",
      icon: "home",
    },
    // {
    //   title: "Settings",
    //   href: "/settings",
    //   icon: "settings",
    // },
  ],
};
