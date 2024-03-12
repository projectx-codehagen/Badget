"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/app/config";

export function Breadcrumbs({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [_, workspaceId, ...rest] = pathname.split("/");
  const baseUrl = `/${workspaceId}`;
  const restAsString = rest.join("/");

  return (
    <>
      <div className="hidden h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground md:inline-flex">
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
      <div className="flex md:hidden">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-cal text-xl font-semibold capitalize leading-none">
                {workspaceId}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col gap-1 px-2 py-1">
                {items.map(({ title, href }) => {
                  return (
                    <Link
                      key={title}
                      href={`${baseUrl}/${href}`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {title}
                      </NavigationMenuLink>
                    </Link>
                  );
                })}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
