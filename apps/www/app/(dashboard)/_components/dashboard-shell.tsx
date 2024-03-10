import React from "react";

import { Separator } from "@/components/ui/separator";
import { NavItem } from "@/app/config";

import { Breadcrumbs } from "./breadcrumbs";

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
          <h1 className="font-cal hidden text-xl font-semibold capitalize leading-none md:inline">
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
