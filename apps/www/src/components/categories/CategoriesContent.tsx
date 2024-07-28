"use client";

import React, { useCallback, useState } from "react";
import { getTransactionsForCategory } from "@/actions/get-transactions-for-category";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

import { CategoryChart } from "../charts/CategoryChart";
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
  name: string;
  startDate: Date;
  endDate: Date;
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
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setTransactions([]);
    }
  }, []);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <CategoryChart categories={categories} />
        <RegularCategoriesTable
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </div>
      <div className="space-y-6">
        {budget && (
          <Card>
            <CardHeader>
              <CardTitle>{budget.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Budget: ${budget.amount.toFixed(2)}</p>
              <p>
                Period: {new Date(budget.startDate).toLocaleDateString()} -{" "}
                {new Date(budget.endDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        )}
        {selectedCategory && (
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
                  <p className="text-sm text-muted-foreground">Transactions</p>
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
        )}
      </div>
    </div>
  );
}
