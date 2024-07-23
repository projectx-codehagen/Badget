import { redirect } from "next/navigation";
import { getUserBankAccounts } from "@/actions/get-bankaccounts"; // Adjust the import path as needed

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import BankAccountsTable from "@/components/banking/BankAccountsTable";
import { AddAccountSheet } from "@/components/buttons/AddAccountSheeet";
import { AddButton } from "@/components/buttons/AddButton";
import { AreaChartBanking } from "@/components/charts/AreaChart";
import { OverallUseageChart } from "@/components/charts/OverallUseageChart";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

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
  console.log(bankAccounts);

  return (
    <DashboardShell>
      <DashboardHeader heading="Banking" text="Overview off all your accounts ">
        <AddAccountSheet currentPath="/banking" />
      </DashboardHeader>
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
            <AddAccountSheet currentPath="/banking" />
          </EmptyPlaceholder>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <AreaChartBanking />
            <OverallUseageChart />

            <div className="col-span-1 md:col-span-2">
              <BankAccountsTable bankAccounts={bankAccounts} />
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
