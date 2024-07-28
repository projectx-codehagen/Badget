import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserBankAccounts } from "@/actions/get-bankaccounts"; // Adjust the import path as needed
import { getUserCategories } from "@/actions/get-categories";
import { getUserBudget } from "@/actions/get-user-budget";

import { Button } from "@dingify/ui/components/button";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { AddAccountSheet } from "@/components/buttons/AddAccountSheeet";
import { BudgetDialog } from "@/components/categories/BudgetCreationDialog";
import { CategoriesContent } from "@/components/categories/CategoriesContent";
import { CategoriesDropdownMenu } from "@/components/categories/CategoriesDropdownMenu";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export const metadata = {
  title: "Categories",
  description:
    "See all your categories in one place and track your finances with ease with Badget",
};

export default async function CategoriesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/login");
  }

  const [categories, budget, bankAccounts] = await Promise.all([
    getUserCategories(),
    getUserBudget(),
    getUserBankAccounts(),
  ]);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Categories"
        text="See your budget and how you spend your money"
      />
      <div className="-mb-4 flex items-center justify-between">
        <div></div>
        <CategoriesDropdownMenu budget={budget} />
      </div>
      <div>
        {bankAccounts.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              You don't have any bank accounts set up
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Add a bank account to start tracking your expenses
            </EmptyPlaceholder.Description>
            <Button asChild>
              <Link href="/dashboard/banking">Add Bank Account</Link>
            </Button>
          </EmptyPlaceholder>
        ) : !budget ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="Coins" />
            <EmptyPlaceholder.Title>
              You don't have a budget set up
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Create a budget to start managing your finances
            </EmptyPlaceholder.Description>
            <BudgetDialog existingBudget={undefined}>
              <Button>Create Budget</Button>
            </BudgetDialog>
          </EmptyPlaceholder>
        ) : (
          <CategoriesContent initialCategories={categories} budget={budget} />
        )}
      </div>
    </DashboardShell>
  );
}
