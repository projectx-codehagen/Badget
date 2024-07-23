import { redirect } from "next/navigation";
import { getUserTransactions } from "@/actions/badget/get-transactions";
import { getTransactionsToReview } from "@/actions/badget/get-transactions-to-review";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { AddAccountSheet } from "@/components/buttons/AddAccountSheeet";
import { AddApiKeyButton } from "@/components/buttons/AddApiKeyButton";
import { AddButton } from "@/components/buttons/AddButton";
import { BudgetVsCostChart } from "@/components/charts/BudgetVsCostChart";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import TransactionsToReview from "@/components/tables/TransactionsToReview";

export const metadata = {
  title: "Dashboard",
  description:
    "Dash Badget is a platform that helps you track your transactions and analyze your spending.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const transactions = await getUserTransactions();
  const reviewTransactions = await getTransactionsToReview();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your analytics dashboard">
        <AddAccountSheet currentPath={undefined} />
      </DashboardHeader>
      <div>
        {transactions.length === 0 ? (
          // Render EmptyPlaceholder if there are no transactions
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              You have no transactions
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Let's start with importing some transactions
            </EmptyPlaceholder.Description>
            <AddButton triggerLabel="Add Asset">
              <AddAssetFlow />
            </AddButton>
          </EmptyPlaceholder>
        ) : (
          // Render TransactionsTable if there are transactions
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BudgetVsCostChart />
            <BudgetVsCostChart />
            <div className="col-span-1 md:col-span-2">
              <TransactionsToReview transactions={reviewTransactions} />
              <TransactionsToReview transactions={reviewTransactions} />
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
