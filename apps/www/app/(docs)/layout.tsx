import Link from "next/link";
import { DocsSearch } from "@/apps/www/components/docs/search";
import { DocsSidebarNav } from "@/apps/www/components/docs/sidebar-nav";
import { NavBar } from "@/apps/www/components/layout/navbar";
import { SiteFooter } from "@/apps/www/components/layout/site-footer";
import { Icons } from "@/apps/www/components/shared/icons";
import { docsConfig } from "@/apps/www/config/docs";
import { siteConfig } from "@/apps/www/config/site";
import { getCurrentUser } from "@/apps/www/lib/session";

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
  const user = await getCurrentUser();

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
      <SiteFooter className="border-t" />
    </div>
  );
}
