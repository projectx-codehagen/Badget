import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import SettingSidebarNav from "@/components/layout/settings-sidebar-nav";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings-page for Badget",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Connectors",
    href: "/dashboard/settings/connectors",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
  {
    title: "Bank Account",
    href: "/dashboard/settings/bank-account",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/settings/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 px-10 py-4 pb-16 md:block">
        <Link
          href="/dashboard"
          className="group -mx-2 flex w-fit items-center gap-1 opacity-75 hover:opacity-100"
        >
          <ChevronLeft className="ml-1 h-4 w-4 transition-all group-hover:ml-0 group-hover:mr-1" />{" "}
          Dashboard
        </Link>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingSidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
