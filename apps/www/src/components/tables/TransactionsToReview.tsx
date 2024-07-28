"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCategoriesReview } from "@/actions/get-categories-review";
import { updateMultipleTransactionReviews } from "@/actions/update-multiple-transactions-review";
import { updateTransactionReview } from "@/actions/update-transaction-review";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { Checkbox } from "@dingify/ui/components/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

import { CategoryBadge } from "../buttons/CategoryBadge";

interface Transaction {
  id: string;
  date: string;
  bankAccount: { name: string };
  description: string;
  amount: number;
}

export default function TransactionsToReview({ transactions }) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategoriesReview();
        setCategories(fetchedCategories as any);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }

    fetchCategories();
  }, []);

  const handleReviewTransaction = async (transactionId) => {
    const response = await updateTransactionReview(transactionId);
    if (response.success) {
      toast.success("Transaction marked as reviewed");
      // Optionally, you might want to refresh the data or remove the reviewed transaction from the list
    } else {
      toast.error("Failed to mark transaction as reviewed");
    }
  };

  const handleReviewSelectedTransactions = async () => {
    const selectedTransactionIds = Object.keys(rowSelection).map(
      (index) => transactions[parseInt(index)].id,
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

  const columns: ColumnDef<Transaction>[] = [
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
      header: () => "Date",
      cell: ({ row }) => (
        <div>{format(new Date(row.original.date), "dd MMMM yyyy")}</div>
      ),
    },
    {
      accessorKey: "accountname",
      header: () => "Account",
      cell: ({ row }) => <div>{row.original.bankAccount.name}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <CategoryBadge transaction={row.original} categories={categories} />
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      id: "actions",
      header: "Review",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={() => handleReviewTransaction(row.original.id)}
        >
          <span className="sr-only">Review</span>
          <Check className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="flex items-center">
      <Card>
        <CardHeader className="flex flex-row items-center px-7">
          <div>
            <CardTitle>Transactions to Review</CardTitle>
            <CardDescription>Review your recent transactions.</CardDescription>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="ml-auto gap-1 text-sm text-muted-foreground"
          >
            <Link href="/dashboard/banking">
              <span className="flex items-center">
                Review
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
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
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
              {/* {table.getFilteredSelectedRowModel().rows.length > 0 && ( */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleReviewSelectedTransactions}
              >
                Mark {table.getFilteredSelectedRowModel().rows.length} as
                reviewed
              </Button>
              {/* )} */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
