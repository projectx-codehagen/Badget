import { SiteFooter } from "@/components/layout/site-footer";
import { TopNav } from "@/components/layout/top-nav";

import { docsTopNavItems } from "../config";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav navItems={docsTopNavItems} />
      <div className="container flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
