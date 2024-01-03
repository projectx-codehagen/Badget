import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import AccountsPage from "@/components/accounts/page";

export const metadata = {
  title: "Accounts",
  description: "Accounts description",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return <AccountsPage />;
}
