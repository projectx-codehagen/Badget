import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/layout/site-footer";
import { Icons } from "@/components/shared/icons";
import { UserNav } from "@/components/user-nav";
import { topNavItems } from "@/app/config";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen rounded-[0.5rem]">
      <nav className="sticky top-0 z-10 flex h-16 items-center gap-6 border-b bg-background/60 px-4 backdrop-blur-xl transition-all">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
          <span className="hidden font-urban text-xl font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {topNavItems?.map((item, index) => (
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
      <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
