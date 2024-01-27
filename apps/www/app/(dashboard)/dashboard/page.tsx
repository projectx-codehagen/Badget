import { Dashboard } from "@/components/new-dashboard/components/dashboard-1";

export const metadata = {
  title: "Dasboard",
  description: "Dashboard description",
};

export default async function DashboardPage() {
  return (
    <div className="flex flex-col">
      <Dashboard />
    </div>
  );
}
