import { redirect } from "next/navigation";
import { getUserTransactions } from "@/actions/badget/get-transactions";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { AddApiKeyButton } from "@/components/buttons/AddApiKeyButton";
import { AddButton } from "@/components/buttons/AddButton";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { TransactionsReviewTable } from "@/app/(dashboard)/(workspaceId)/aimagic/_components/transaction-review-table";

export const metadata = {
  title: "Badget",
  description:
    "Badget is a platform that helps you track your transactions and analyze your spending.",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const transactions = await getUserTransactions();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Your analytics dashboard">
        <AddButton triggerLabel="Add Asset">
          <AddAssetFlow />
        </AddButton>
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
          <TransactionsReviewTable />
        )}
      </div>
    </DashboardShell>
  );
}
