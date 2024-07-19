import { notFound } from "next/navigation";
import { DashboardNav } from "@/components/layout/nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { propertyConfig } from "@/config/property";
import { getCurrentUser } from "@/lib/session";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  params: { id: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  const slug = params.id;

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={propertyConfig.mainNav} scroll={false} />

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav slug={slug} items={propertyConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
