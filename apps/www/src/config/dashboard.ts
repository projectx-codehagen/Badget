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
      href: "/dashboard",
      icon: "LayoutDashboard",
    },
    {
      href: "/dashboard/banking",
      title: "Banking",
      icon: "Layers",
    },
    {
      href: "/dashboard/categories",
      title: "Categories",
      icon: "piechart",
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
