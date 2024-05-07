import { SiteFooter } from "@/components/layout/site-footer";
import { TopNav } from "@/components/layout/top-nav";
import { topNavItems } from "@/app/config";

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <TopNav navItems={topNavItems} />
      <main className="flex-1 space-y-4">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
}
