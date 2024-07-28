"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getTransactionsForCategory } from "@/actions/get-transactions-for-category";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

import { CategoryChart } from "../charts/CategoryChart";
import { CategorySpendingChart } from "./CategorySpendingChart";
import { RegularCategoriesTable } from "./RegularCategoriesTable";
import { TransactionTable } from "./TransactionTable";

interface Category {
  id: string;
  name: string;
  icon: string;
  spent: number;
  budget: number;
  _count: { transactions: number };
  subCategories?: Category[];
}

interface Budget {
  id: string;
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;
  amount: number;
  categories: {
    id: string;
    name: string;
    icon: string;
    budget: number;
  }[];
}

interface CategoriesContentProps {
  initialCategories: Category[];
  budget: Budget | null;
}

interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
}

export function CategoriesContent({
  initialCategories,
  budget,
}: CategoriesContentProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categorySpendingData, setCategorySpendingData] = useState<
    { month: string; amount: number }[]
  >([]);

  const handleCategorySelect = useCallback(async (category: Category) => {
    setSelectedCategory(category);
    try {
      const categoryTransactions = await getTransactionsForCategory(
        category.id,
      );
      setTransactions(
        categoryTransactions.map((transaction) => ({
          ...transaction,
          category: transaction.category ?? "Uncategorized",
        })),
      );

      // Calculate monthly spending data
      const monthlySpending = categoryTransactions.reduce(
        (acc, transaction) => {
          const month = new Date(transaction.date)
            .toLocaleString("default", { month: "short" })
            .charAt(0);
          acc[month] = (acc[month] || 0) + transaction.amount;
          return acc;
        },
        {} as Record<string, number>,
      );

      setCategorySpendingData(
        Object.entries(monthlySpending).map(([month, amount]) => ({
          month,
          amount,
        })),
      );
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions([]);
      setCategorySpendingData([]);
    }
  }, []);

  // Effect to select the first category by default
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const firstCategory = categories[0];
      if (firstCategory) {
        handleCategorySelect(firstCategory);
      }
    }
  }, [categories, selectedCategory, handleCategorySelect]);

  // Merge budget information with categories
  const categoriesWithBudget = categories.map((category) => {
    const budgetCategory = budget?.categories.find(
      (bc) => bc.id === category.id,
    );
    return {
      ...category,
      budget: budgetCategory?.budget ?? 0,
    };
  });

  const totalSpent = categoriesWithBudget.reduce(
    (sum, cat) => sum + cat.spent,
    0,
  );
  const totalBudget = categoriesWithBudget.reduce(
    (sum, cat) => sum + cat.budget,
    0,
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <CategoryChart categories={categoriesWithBudget} />
        <RegularCategoriesTable
          categories={categoriesWithBudget}
          onCategorySelect={handleCategorySelect}
          selectedCategoryId={selectedCategory?.id}
        />
      </div>
      <div className="space-y-6">
        {selectedCategory && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedCategory.icon} {selectedCategory.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Spent</p>
                      <p className="text-xl font-semibold">
                        ${selectedCategory.spent.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="text-xl font-semibold">
                        ${selectedCategory.budget.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Transactions
                    </p>
                    <p className="text-xl font-semibold">
                      {selectedCategory._count.transactions}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Recent Transactions
                    </h3>
                    <TransactionTable transactions={transactions} />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <CategorySpendingChart
              categoryName={selectedCategory.name}
              spendingData={categorySpendingData}
              budget={selectedCategory.budget}
            /> */}
          </>
        )}
      </div>
    </div>
  );
}
