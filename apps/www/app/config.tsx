import type { Route } from "next";
import {
  BarChart,
  Building,
  CreditCard,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LucideIcon,
  Settings,
  Sparkle,
  Sprout,
} from "lucide-react";

export const siteConfig = {
  name: "Badget",
  description:
    "Empower your financial management with AI-driven insights, making tracking and optimizing your finances effortless.",
  github: "https://github.com/projectx-codehagen/Badget",
  twitter: "https://twitter.com/codehagen",
};

export type NavItem = {
  href: Route;
  title: string;
  badge?: string;
  icon?: LucideIcon;
};

export type GroupedNavItems = {
  group: string;
  items: NavItem[];
};

export const topNavItems = [
  {
    href: "/docs",
    title: "Documentation",
  },
  {
    href: "/support",
    title: "Support",
  },
] satisfies NavItem[];

export const marketingTopNavItems = [
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Open Startup",
    href: "/open",
  },
  {
    title: "Open Source Friends",
    href: "/oss-friends",
  },
] satisfies NavItem[];

export const docsTopNavItems = [
  {
    title: "Documentation",
    href: "/docs",
  },
] satisfies NavItem[];

export const sideNavItems: GroupedNavItems[] = [
  {
    group: "primary",
    items: [
      {
        href: "/dashboard",
        title: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: "/banking",
        title: "Banking",
        icon: Layers,
      },
      {
        href: "/investment",
        title: "Investments",
        badge: "soon",
        icon: BarChart,
      },
      {
        href: "/assets",
        title: "Assets",
        badge: "soon",
        icon: Building,
      },
      {
        href: "/savings",
        title: "Savings",
        badge: "soon",
        icon: Sprout,
      },
      {
        href: "/liabilities",
        title: "Liabilities",
        badge: "soon",
        icon: CreditCard,
      },
    ],
  },
  {
    group: "secondary",
    items: [
      {
        href: "/aimagic",
        title: "AI Magic",
        badge: "soon",
        icon: Sparkle,
      },
    ],
  },
  {
    group: "tertiary",
    items: [
      {
        href: "/help",
        title: "Get Help",
        icon: HelpCircle,
      },
      {
        href: "/settings",
        title: "Settings",
        icon: Settings,
      },
    ],
  },
];
