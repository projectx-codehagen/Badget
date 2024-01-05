import { Suspense } from "react";
import { NavBar } from "@/apps/www/components/layout/navbar";
import { SiteFooter } from "@/apps/www/components/layout/site-footer";
import { marketingConfig } from "@/apps/www/config/marketing";
import { getCurrentUser } from "@/apps/www/lib/session";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar user={user} items={marketingConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
