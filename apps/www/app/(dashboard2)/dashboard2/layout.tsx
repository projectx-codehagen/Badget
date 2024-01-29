import { currentUser } from "@clerk/nextjs";

import { dashboardConfig } from "@/config/dashboard";
import { normalizeUser } from "@/lib/utils";
import { DashboardNav } from "@/components/layout/nav";
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

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
