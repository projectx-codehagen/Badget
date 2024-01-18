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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: "1",
    category: "Total Spent per Year",
    "2022": 570, // Total spent in 2022
    "2023": 600, // Total spent in 2023
    "2024": 620, // Total spent in 2024
  },
  {
    id: "2",
    category: "Average Monthly Spend",
    "2022": 570 / 12,
    "2023": 600 / 12,
    "2024": 620 / 12,
  },
];

export type Category = {
  id: string;
  category: string;
  "2022": number;
  "2023": number;
  "2024": number;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "category",
    header: "Key Metrics",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <div className="flex items-center">{category}</div>;
    },
  },
  {
    accessorKey: "2022",
    header: () => <div className="text-right">2022</div>,
    cell: ({ row }) => {
      const totalSpent = parseFloat(row.getValue("2022"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalSpent);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "2023",
    header: () => <div className="text-right">2023</div>,
    cell: ({ row }) => {
      const totalSpent = parseFloat(row.getValue("2023"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalSpent);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "2024",
    header: () => <div className="text-right">2024</div>,
    cell: ({ row }) => {
      const totalSpent = parseFloat(row.getValue("2024"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalSpent);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function KeyMetricsTable() {
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
