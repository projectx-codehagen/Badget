import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";

import { marketingConfig } from "@/config/marketing";
import { normalizeUser } from "@/lib/utils";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const clerkUser = await currentUser();
  const user = normalizeUser(clerkUser);

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
