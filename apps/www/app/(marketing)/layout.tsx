import { SiteFooter } from "@/components/layout/site-footer";
import { TopNav } from "@/components/layout/top-nav";

import { marketingTopNavItems } from "../config";

export default async function MarketingLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen rounded-[0.5rem]">
      <TopNav navItems={marketingTopNavItems} />
      <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
