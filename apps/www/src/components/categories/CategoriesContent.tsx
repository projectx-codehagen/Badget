"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

import { CategoryChart } from "../charts/CategoryChart";
import { RegularCategoriesTable } from "./RegularCategoriesTable";

interface Category {
  id: string;
  name: string;
  icon: string;
  spent: number;
  budget: number;
  _count: { transactions: number };
  subCategories?: Category[];
}

interface CategoriesContentProps {
  initialCategories: Category[];
}

export function CategoriesContent({
  initialCategories,
}: CategoriesContentProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-semibold">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-semibold">
                  ${totalBudget.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {selectedCategory && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedCategory.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Spent:</span> $
                  {selectedCategory.spent.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Budget:</span> $
                  {selectedCategory.budget.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Transactions:</span>{" "}
                  {selectedCategory._count.transactions}
                </p>
                {/* Add more details here as needed */}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
