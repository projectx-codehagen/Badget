import { notFound } from "next/navigation";
import { DashboardNav } from "@/apps/www/components/layout/nav";
import { NavBar } from "@/apps/www/components/layout/navbar";
import { SiteFooter } from "@/apps/www/components/layout/site-footer";
import { dashboardConfig } from "@/apps/www/config/dashboard";
import { getCurrentUser } from "@/apps/www/lib/session";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={dashboardConfig.mainNav} scroll={false} />

      {children}
      <SiteFooter className="border-t" />
    </div>
  );
}
