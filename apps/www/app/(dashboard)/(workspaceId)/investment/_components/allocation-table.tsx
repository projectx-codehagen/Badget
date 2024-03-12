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
  HomeIcon,
  KeyIcon,
  ShoppingBagIcon,
  StarIcon,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
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
    name: "Equity",
    icon: "Home",
    current: 4000,
    totalpercentage: 2,
  },
  {
    id: "car",
    name: "Crypto",
    icon: "Car",
    current: 1984,
    totalpercentage: 2,
  },
  {
    id: "rent",
    name: "ETF",
    icon: "Key",
    current: 1000,
    totalpercentage: 2,
  },
];

export type Category = {
  id: string;
  name: string;
  icon: string;
  current: number;
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
  // ... add other icon mappings
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
    id: "progress",
    header: "Portfolio Spread",
    cell: ({ row }) => {
      const current = row.getValue("current") as number;
      const totalPortfolioValue = data.reduce(
        (sum, item) => sum + item.current,
        0,
      );
      const progressPercent = (current / totalPortfolioValue) * 100;

      return (
        <div className="w-full px-2">
          <Progress value={progressPercent} className="w-full" />
        </div>
      );
    },
  },
  {
    accessorKey: "current",
    header: () => <div className="text-right">Allocated</div>,
    cell: ({ row }) => {
      const current = parseFloat(row.getValue("current"));
      const totalPortfolioValue = data.reduce(
        (sum, item) => sum + item.current,
        0,
      );
      const categoryPercentage = (current / totalPortfolioValue) * 100;

      const formattedPercentage = categoryPercentage.toFixed(2) + "%"; // Format the percentage to two decimal places

      return (
        <div className="text-right font-medium">{formattedPercentage}</div>
      );
    },
  },
  {
    accessorKey: "max",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const max = parseFloat(row.getValue("current"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(max);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function AllocationTable() {
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
    <div className="flex flex-col space-y-1.5 p-4">
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
