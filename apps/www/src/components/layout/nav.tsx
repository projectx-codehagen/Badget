"use client";

import type { SidebarNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@dingify/ui/components/separator";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";

interface DashboardNavProps {
  items: SidebarNavItem[];
  slug?: string;
}

export function DashboardNav({ items, slug }: DashboardNavProps) {
  const path = usePathname();

  if (!items.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          <div key={item.href}>
            <Link
              href={
                item.disabled
                  ? `/`
                  : `${slug ? `/property/${slug}${item.href}` : `${item.href}`}`
              }
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
            {item.title === "Settings" && (
              <>
                <Separator key={`separator-${item.href}`} />
                <div
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    "text-foreground/60",
                    "cursor-default px-3 py-2",
                  )}
                >
                  Your Channels
                </div>
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
