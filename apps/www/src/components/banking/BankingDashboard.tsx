"use client";

import { useState } from "react";

import { AddTransactionsButton } from "@/components/buttons/AddTransactionsButton";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

import BankingDashboardDetails from "./BankingDashboardDetails";
import BankingDashboardTable from "./BankingDashboardTable";

export default function BankingDashboard({ transactions }) {
  const [selectedTransactionId, setSelectedTransactionId] = useState(
    transactions[0]?.id,
  );

  const selectedTransaction = transactions.find(
    (transaction) => transaction.id === selectedTransactionId,
  );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        {/* <TransactionsDashboardCards transactionStats={transactionStats} /> */}
        {transactions.length > 0 ? (
          <BankingDashboardTable
            transactions={transactions}
            setSelectedTransactionId={setSelectedTransactionId}
            selectedTransactionId={selectedTransactionId}
          />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              You have no transactions
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Let's start with importing some transactions
            </EmptyPlaceholder.Description>
            {/* <AddTransactionsButton /> */}
          </EmptyPlaceholder>
        )}
      </div>
      <div className="mt-2">
        <BankingDashboardDetails transaction={selectedTransaction} />
      </div>
    </main>
  );
}
