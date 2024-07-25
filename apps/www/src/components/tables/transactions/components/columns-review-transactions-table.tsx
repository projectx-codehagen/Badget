"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Checkbox } from "@dingify/ui/components/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// Define your data type
export interface Transaction {
  id: string;
  amount: number;
  currencyIso: string;
  date: string;
  description: string;
  review: boolean;
  category: {
    id: string;
    name: string;
    icon: string;
  } | null;
  bankAccount: {
    id: string;
    name: string;
  };
  label: string;
  categoryId: string;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return format(new Date(row.getValue("date")), "dd MMMM yyyy");
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return category ? `${category.icon} ${category.name}` : "Uncategorized";
    },
    filterFn: (row, id, value) => {
      const category = row.original.category;
      const categoryName = category ? category.name : "Uncategorized";
      return value.includes(categoryName);
    },
  },
  {
    accessorKey: "bankAccount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
    cell: ({ row }) => row.original.bankAccount.name,
    filterFn: (row, id, value) => {
      return value.includes(row.original.bankAccount.id);
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.currencyIso,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "review",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Review" />
    ),
    cell: ({ row }) => (row.getValue("review") ? "Yes" : "No"),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} categories={[]} />,
  },
];
