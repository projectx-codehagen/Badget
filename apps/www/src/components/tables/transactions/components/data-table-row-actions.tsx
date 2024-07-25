"use client";

import type { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { updateCategoryReviewTable } from "@/actions/update-category-review-table";
import { Check, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";

import type { Transaction } from "./columns-review-transactions-table";

import { EditTransactionSheet } from "@/components/buttons/EditTransactionSheet";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  categories: Category[];
}

export function DataTableRowActions<TData>({
  row,
  categories,
}: DataTableRowActionsProps<TData>) {
  const transaction = row.original as Transaction;
  const [selectedCategory, setSelectedCategory] = useState<string>(
    transaction.categoryId || "",
  );

  const handleUpdateCategory = async (categoryId: string) => {
    try {
      const response = await updateCategoryReviewTable(
        transaction.id,
        categoryId,
      );
      if (response.success) {
        toast.success("Category updated successfully");
        setSelectedCategory(categoryId);
      } else {
        toast.error(response.error ?? "Failed to update category");
        console.error(response.error);
      }
    } catch (error) {
      toast.error("An error occurred while updating the category");
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(transaction.id)}
        >
          Copy transaction ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {categories.length > 0 ? (
              categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedCategory === category.id}
                  onCheckedChange={(checked) =>
                    handleUpdateCategory(category.id)
                  }
                >
                  {category.icon} {category.name}
                </DropdownMenuCheckboxItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                No categories available
              </DropdownMenuItem>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <EditTransactionSheet
          transaction={{
            id: transaction.id,
            description: transaction.description,
            // amount: transaction.amount,
            date: new Date(transaction.date),
            categoryId: transaction.categoryId,
            // review: transaction.review,
          }}
          categories={categories}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit transaction
          </DropdownMenuItem>
        </EditTransactionSheet>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
