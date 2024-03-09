"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavItem } from "@/app/config";

export function Breadcrumbs({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [_, workspaceId, ...rest] = pathname.split("/");
  const baseUrl = `/${workspaceId}`;
  const restAsString = rest.join("/");

  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {items.map(({ title, href }) => {
        const isActive =
          href === restAsString ||
          (href === "overview" && "" === restAsString) ||
          (href !== "" && restAsString.startsWith(href));
        return (
          <Link
            key={href}
            href={`${baseUrl}/${href}`}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive && "bg-background font-bold text-foreground shadow-sm",
            )}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}
