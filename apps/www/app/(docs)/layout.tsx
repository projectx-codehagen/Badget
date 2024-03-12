import Link from "next/link";

import { siteConfig } from "@/config/site";
import { DocsSearch } from "@/components/docs/search";
import { SiteFooter } from "@/components/layout/site-footer";
import { TopNav } from "@/components/layout/top-nav";
import { Icons } from "@/components/shared/icons";

import { docsTopNavItems } from "../config";

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
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav navItems={docsTopNavItems} />
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
