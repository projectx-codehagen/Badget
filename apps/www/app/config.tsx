import type { Route } from "next";
import {
  BarChart,
  Building,
  CreditCard,
  Layers,
  LayoutDashboard,
  LucideIcon,
  Sprout,
} from "lucide-react";

export const siteConfig = {
  name: "Badget.",
  description:
    "Empower your financial management with AI-driven insights, making tracking and optimizing your finances effortless.",
  github: "https://github.com/projectx-codehagen/Badget",
  twitter: "https://twitter.com/codehagen",
};

export type NavItem = {
  href: Route;
  title: string;
  badge?: "upcoming" | "next" | "future" | "soon";
  group?: "openbanking" | "investments" | "savings" | "assets" | "liabilities";
  icon?: LucideIcon;
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

export const navItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/openbanking",
    title: "Open Banking",
    icon: Layers,
  },
  {
    href: "/savings",
    title: "Savings",
    badge: "soon",
    icon: Sprout,
  },
  {
    href: "/investments",
    title: "Investments",
    badge: "future",
    icon: BarChart,
  },
  {
    href: "/assets",
    title: "Assets",
    badge: "upcoming",
    icon: Building,
  },
  {
    href: "/liabilities",
    title: "Liabilities",
    badge: "next",
    icon: CreditCard,
  },
] satisfies NavItem[];
