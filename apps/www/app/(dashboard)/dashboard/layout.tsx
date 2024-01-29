import { currentUser } from "@clerk/nextjs";

import { dashboardConfig } from "@/config/dashboard";
import { normalizeUser } from "@/lib/utils";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const clerkUser = await currentUser();
  const user = normalizeUser(clerkUser);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
