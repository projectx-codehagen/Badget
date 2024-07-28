"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import { getCategoriesReview } from "@/actions/get-categories-review";
import { updateMultipleTransactionReviews } from "@/actions/update-multiple-transactions-review";
import { Category } from "@prisma/client";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import { DataTableRowActions } from "./data-table-row-actions";

interface ReviewTransactionsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ReviewTransactionsTable<TData, TValue>({
  columns,
  data,
}: ReviewTransactionsTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategoriesReview();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleReviewSelectedTransactions = async () => {
    const selectedTransactionIds = Object.keys(rowSelection).map(
      (index) => (data[parseInt(index)] as any).id,
    );

    if (selectedTransactionIds.length === 0) {
      toast.error("No transactions selected");
      return;
    }

    const response = await updateMultipleTransactionReviews(
      selectedTransactionIds,
    );
    if (response.success) {
      toast.success(
        `${selectedTransactionIds.length} transaction(s) marked as reviewed`,
      );
      setRowSelection({});
    } else {
      toast.error("Failed to mark transactions as reviewed");
    }
  };

  const table = useReactTable({
    data,
    columns: columns.map((col) => {
      if (col.id === "actions") {
        return {
          ...col,
          cell: ({ row }) => (
            <DataTableRowActions row={row} categories={categories} />
          ),
        };
      }
      return col;
    }),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        handleReviewSelectedTransactions={handleReviewSelectedTransactions}
        categories={categories}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
