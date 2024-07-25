import { redirect } from "next/navigation";
import { getUserBankAccounts } from "@/actions/get-bankaccounts"; // Adjust the import path as needed

import { getTransactionsToReview } from "@/actions/get-transactions-to-review";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dingify/ui/components/tabs";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import BankAccountsTable from "@/components/banking/BankAccountsTable";
import { BankingDropdownMenu } from "@/components/banking/BankingDropdownMenu";
import { AddAccountSheet } from "@/components/buttons/AddAccountSheeet";
import { AreaChartBanking } from "@/components/charts/AreaChart";
import { OverallUseageChart } from "@/components/charts/OverallUseageChart";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { columns } from "@/components/tables/transactions/components/columns-review-transactions-table";
import { ReviewTransactionsTable } from "@/components/tables/transactions/components/review-transactions-table";

export const metadata = {
  title: "Banking",
  description:
    "See all your bank accounts in one place and track your finances with ease with Badget",
};

export default async function BankingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/login");
  }

  const bankAccounts = await getUserBankAccounts();
  const reviewTransactions = await getTransactionsToReview();

  return (
    <DashboardShell>
      <DashboardHeader heading="Banking" text="Overview off all your accounts">
        <AddAccountSheet currentPath="/banking" children={undefined} />
      </DashboardHeader>
      <Tabs defaultValue="overview" className="-mt-4 w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="transactions" disabled>
              Transactions
            </TabsTrigger>
          </TabsList>
          <BankingDropdownMenu />
        </div>
        <TabsContent value="overview">
          <div>
            {bankAccounts.length === 0 ? (
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="post" />
                <EmptyPlaceholder.Title>
                  You have no bank accounts
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  Add a bank account to start tracking your finances.
                </EmptyPlaceholder.Description>
                <AddAccountSheet currentPath="/banking" children={undefined} />
              </EmptyPlaceholder>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <AreaChartBanking />
                <OverallUseageChart />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="accounts">
          {bankAccounts.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                You have no bank accounts
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Add a bank account to start tracking your finances.
              </EmptyPlaceholder.Description>
              <AddAccountSheet currentPath="/banking" children={undefined} />
            </EmptyPlaceholder>
          ) : (
            <BankAccountsTable bankAccounts={bankAccounts} />
          )}
        </TabsContent>
        <TabsContent value="review">
          {bankAccounts.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                No accounts to review
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Add a bank account to start reviewing your finances.
              </EmptyPlaceholder.Description>
              <AddAccountSheet currentPath="/banking" children={undefined} />
            </EmptyPlaceholder>
          ) : (
            <div>
              <ReviewTransactionsTable
                data={reviewTransactions}
                columns={columns}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="transactions">
          {bankAccounts.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                No transactions to display
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Add a bank account to start tracking your transactions.
              </EmptyPlaceholder.Description>
              <AddAccountSheet currentPath="/banking" children={undefined} />
            </EmptyPlaceholder>
          ) : (
            <div>
              <p>Transactions content goes here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
