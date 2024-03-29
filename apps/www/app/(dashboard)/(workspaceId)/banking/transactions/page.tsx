import { use } from "react";
import { cookies } from "next/headers";
import { api } from "@/trpc/server";

import { TransactionsDashboard } from "./_components/transactions-dashboard";

export const metadata = {
  title: "Transactions",
  description: "Transactions description",
};

export default async function DashboardPage() {
  const layout = cookies().get("react-resizable-panels:layout-transactions");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  const listTransactions = await api.transaction.listTransactions.query();

  return (
    <>
      <div className="flex flex-col">
        <TransactionsDashboard
          transactions={listTransactions}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
