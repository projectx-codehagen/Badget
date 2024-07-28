"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Progress } from "@dingify/ui/components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

interface Category {
  id: string;
  name: string;
  icon: string;
  spent: number;
  budget: number;
  _count: { transactions: number };
  subCategories?: Category[];
}

interface RegularCategoriesTableProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  selectedCategoryId?: string;
}

export function RegularCategoriesTable({
  categories,
  onCategorySelect,
  selectedCategoryId,
}: RegularCategoriesTableProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const renderCategoryRow = (category: Category, depth = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasSubCategories =
      category.subCategories && category.subCategories.length > 0;

    const progress =
      category.budget > 0 ? (category.spent / category.budget) * 100 : 0;

    return (
      <React.Fragment key={category.id}>
        <TableRow
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => {
            onCategorySelect(category);
            if (hasSubCategories) toggleCategory(category.id);
          }}
          style={{
            backgroundColor:
              selectedCategoryId === category.id ? "var(--muted)" : "",
          }}
        >
          <TableCell
            className="font-medium"
            style={{ paddingLeft: `${depth * 20 + 16}px` }}
          >
            {hasSubCategories &&
              (isExpanded ? (
                <ChevronDown className="mr-2 inline" />
              ) : (
                <ChevronRight className="mr-2 inline" />
              ))}
            {category.icon} {category.name}
          </TableCell>
          <TableCell className="text-right">
            ${category.spent.toFixed(2)}
          </TableCell>
          <TableCell>
            <Progress value={progress} className="w-full" />
            <span className="text-xs text-gray-500">{`${progress.toFixed(2)}%`}</span>
          </TableCell>
          <TableCell className="text-right">
            ${category.budget.toFixed(2)}
          </TableCell>

          {/* <TableCell className="text-right">
            {category._count.transactions}
          </TableCell> */}
        </TableRow>
        {isExpanded &&
          category.subCategories?.map((subCategory) =>
            renderCategoryRow(subCategory, depth + 1),
          )}
      </React.Fragment>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Regular Categories</TableHead>
          <TableHead className="text-right">SPENT</TableHead>
          <TableHead className="text-right">PROGRESS</TableHead>
          <TableHead className="text-right">BUDGET</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => renderCategoryRow(category))}
      </TableBody>
    </Table>
  );
}
