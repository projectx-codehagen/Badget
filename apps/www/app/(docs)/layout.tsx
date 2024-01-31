import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { normalizeUser } from "@/lib/utils";
import { DocsSearch } from "@/components/docs/search";
import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { Icons } from "@/components/shared/icons";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const rightHeader = () => (
  <div className="flex flex-1 items-center space-x-4 sm:justify-end">
    <div className="hidden lg:flex lg:grow-0">
      <DocsSearch />
    </div>
    <div className="flex lg:hidden">
      <Icons.search className="h-6 w-6 text-muted-foreground" />
    </div>
    <nav className="flex space-x-4">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub className="h-7 w-7" />
        <span className="sr-only">GitHub</span>
      </Link>
    </nav>
  </div>
);

export default async function DocsLayout({ children }: DocsLayoutProps) {
  const clerkUser = await currentUser();
  const user = normalizeUser(clerkUser);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar
        user={user}
        items={docsConfig.mainNav}
        rightElements={rightHeader()}
      >
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </NavBar>
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
