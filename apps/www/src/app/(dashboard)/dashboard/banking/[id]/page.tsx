import { getBankAccountDetails } from "@/actions/get-bank-account-details";
import { getBankAccountTransactions } from "@/actions/get-bank-account-transactions";

import { AccountDropdownMenu } from "@/components/banking/AccountDropdownMenu";
import BankingDashboard from "@/components/banking/BankingDashboard";
import BankingDashboardDetails from "@/components/banking/BankingDashboardDetails";
import { BankingDropdownMenu } from "@/components/banking/BankingDropdownMenu";
import { AddTransactionsButton } from "@/components/buttons/AddTransactionsButton";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { CSVUploader } from "@/components/import/CsvImporter";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export default async function BankAccountPage({
  params,
}: {
  params: { id: string };
}) {
  const bankAccountId = params.id;

  if (!bankAccountId) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Bank Account not found"
          text="Invalid bank account ID."
        />
      </DashboardShell>
    );
  }

  try {
    const bankAccountDetails = await getBankAccountDetails(bankAccountId);
    const transactions = await getBankAccountTransactions(bankAccountId);
    console.log(transactions);

    if (!bankAccountDetails) {
      return (
        <DashboardShell>
          <DashboardHeader
            heading="Bank Account not found"
            text="We couldn't find the bank account you're looking for."
          />
        </DashboardShell>
      );
    }

    return (
      <DashboardShell>
        <DashboardHeader
          heading={bankAccountDetails.name}
          text="Here are your recent transactions"
        >
          {/* <CSVUploader bankAccountId={bankAccountId} /> */}
        </DashboardHeader>
        <div className=" -mb-4 flex justify-end space-x-2">
          <AccountDropdownMenu bankAccountId={bankAccountId} />
        </div>
        <div>
          {transactions.length === 0 ? (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                You have no transactions
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Let's start with importing some transactions
              </EmptyPlaceholder.Description>
              <AddTransactionsButton bankAccountId={bankAccountId} />
            </EmptyPlaceholder>
          ) : (
            <BankingDashboard transactions={transactions} />
          )}
        </div>
      </DashboardShell>
    );
  } catch (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text={error.message} />
      </DashboardShell>
    );
  }
}
