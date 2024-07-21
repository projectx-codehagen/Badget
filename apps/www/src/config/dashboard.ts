import type { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "https://docs.dingify.io/",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard2",
      icon: "LayoutDashboard",
    },
    {
      href: "/dashboard2/banking",
      title: "Banking",
      icon: "Layers",
    },
    {
      href: "/investment",
      title: "Investments",
      icon: "BarChart",
    },
    {
      href: "/assets",
      title: "Assets",
      icon: "Building",
    },
    {
      href: "/savings",
      title: "Savings",
      icon: "Sprout",
    },
    {
      href: "/liabilities",
      title: "Liabilities",
      icon: "CreditCard",
    },
  ],
};
