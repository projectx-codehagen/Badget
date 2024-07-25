"use client";

import type { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/get-categories";
import { updateCategoryReviewTable } from "@/actions/update-category-review-table";
import { Check, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  DropdownMenu,
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

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const transaction = row.original as Transaction;
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    transaction.categoryId || "",
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

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
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={handleUpdateCategory}
            >
              {categories.map((category) => (
                <DropdownMenuRadioItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
                  {selectedCategory === category.id && (
                    <Check className="ml-2 h-4 w-4" />
                  )}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit transaction</DropdownMenuItem>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
