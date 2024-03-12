import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import { UserNav } from "@/components/user-nav";
import { NavItem, siteConfig } from "@/app/config";

export const TopNav = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center gap-10 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
        <span className="inline-block font-urban text-xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {navItems?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center text-lg font-medium text-foreground/60 transition-colors hover:text-foreground/80 sm:text-sm",
              // TODO: active link css
              // item.href.startsWith(`/${segment}`)
              //   ? "text-foreground"
              //   : "text-foreground/60",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        {/* <Search /> */}
        <UserNav />
      </div>
    </nav>
  );
};
