import { redirect } from "next/navigation";
import { getUserBankAccounts } from "@/actions/get-bankaccounts"; // Adjust the import path as needed

import { getUserCategories } from "@/actions/get-categories";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { AddAccountSheet } from "@/components/buttons/AddAccountSheeet";
import { CategoriesContent } from "@/components/categories/CategoriesContent";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export const metadata = {
  title: "Categories",
  description:
    "See all your categories in one place and track your finances with ease with Badget",
};

export default async function BankingPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/login");
  }

  const bankAccounts = await getUserBankAccounts();
  const categories = await getUserCategories();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Categories"
        text="See your budget and how you spend your money"
      ></DashboardHeader>
      <div>
        {bankAccounts.length === 0 ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              You dont have a budget
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Lets make a budget
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        ) : (
          // <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="">
            {/* <CategoryChart categories={categories} /> */}
            <CategoriesContent initialCategories={categories} />
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
