import type { NavItem } from "@/app/config";
import React from "react";

import { Separator } from "@dingify/ui/components/separator";

import { Breadcrumbs } from "./breadcrumbs";
import HamburgerMenu from "./hamburger-menu";

export function DashboardShell(props: {
  title: string;
  description: React.ReactNode;
  breadcrumbItems?: NavItem[];
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div>
      <nav className="flex h-[52px] items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <HamburgerMenu />
          <h1 className="font-cal ml-4 hidden text-xl font-semibold capitalize leading-none md:inline">
            {props.title}
          </h1>
          {props.breadcrumbItems && (
            <Breadcrumbs items={props.breadcrumbItems} />
          )}
        </div>
        {props.headerAction}
      </nav>
      <Separator />

      <div className={props.className}>{props.children}</div>
    </div>
  );
}
