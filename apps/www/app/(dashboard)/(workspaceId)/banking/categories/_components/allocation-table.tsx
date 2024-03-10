"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  BoltIcon,
  CarIcon,
  CoffeeIcon,
  CreditCard,
  HomeIcon,
  KeyIcon,
  Settings,
  ShoppingBagIcon,
  StarIcon,
} from "lucide-react";

import { ProgressCategories } from "@/components/ui/progress-categoires";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Category[] = [
  {
    id: "home",
    name: "Home",
    icon: "Home",
    current: 4000, // Budget
    spent: 3000, // Under Budget
    totalpercentage: 2,
  },
  {
    id: "car",
    name: "Car & Transportation",
    icon: "Car",
    current: 2000, // Budget
    spent: 5000, // Over Budget
    totalpercentage: 2,
  },
  {
    id: "food",
    name: "Food & Drinks",
    icon: "Coffee",
    current: 1500, // Budget
    spent: 1400, // Near Budget
    totalpercentage: 2,
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    current: 800, // Budget
    spent: 500, // Under Budget
    totalpercentage: 2,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "Star",
    current: 1200, // Budget
    spent: 1300, // Over Budget
    totalpercentage: 2,
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: "CreditCard",
    current: 400, // Budget
    spent: 380, // Near Budget
    totalpercentage: 2,
  },
  {
    id: "other",
    name: "Other",
    icon: "Settings",
    current: 1000, // Budget
    spent: 950, // Near Budget
    totalpercentage: 2,
  },
];

export type Category = {
  id: string;
  name: string;
  icon: string;
  current: number;
  spent: number;
  totalpercentage: number;
};

const iconMap = {
  Home: <HomeIcon className="mr-2 h-5 w-5" />,
  Car: <CarIcon className="mr-2 h-5 w-5" />,
  Key: <KeyIcon className="mr-2 h-5 w-5" />,
  Bolt: <BoltIcon className="mr-2 h-5 w-5" />,
  Star: <StarIcon className="mr-2 h-5 w-5" />,
  ShoppingBag: <ShoppingBagIcon className="mr-2 h-5 w-5" />,
  Coffee: <CoffeeIcon className="mr-2 h-5 w-5" />,
  CreditCard: <CreditCard className="mr-2 h-5 w-5" />,
  Settings: <Settings className="mr-2 h-5 w-5" />,
  // ... you can add other icons as needed
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const icon = row.original.icon; // Assuming 'icon' is the key in your data for icon names
      return (
        <div className="flex items-center">
          {/* @ts-ignore */}
          {iconMap[icon]} {/* Render the corresponding icon */}
          <div className="capitalize">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "spent",
    header: () => <div className="text-right">Spent</div>,
    cell: ({ row }) => {
      const spent = parseFloat(row.getValue("spent"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(spent);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "progress",
    header: "Portfolio Spread",
    cell: ({ row }) => {
      const current = row.getValue("current") as number;
      const spent = row.getValue("spent") as number;

      const progressPercent = current > 0 ? (spent / current) * 100 : 0;

      return (
        <div className="w-full px-2">
          <ProgressCategories value={progressPercent} className="w-full" />
        </div>
      );
    },
  },

  {
    accessorKey: "current",
    header: () => <div className="text-right">Budget</div>,
    cell: ({ row }) => {
      const budget = parseFloat(row.getValue("current"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(budget);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function CategoriesTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="[&:has([role=checkbox])]:pl-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="[&:has([role=checkbox])]:pl-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
