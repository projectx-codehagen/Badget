"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from "@/actions/get-categories";
import { updateTransactionReview } from "@/actions/update-transaction-review";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

import { CategoryBadge } from "../buttons/CategoryBadge";

export default function TransactionsToReview({ transactions }) {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
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

  const columns: ColumnDef<any>[] = [
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
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="flex items-center">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Transactions to Review</CardTitle>
          <CardDescription>Review your recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="">
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

//THIS IS THE OLD TABLE IF WE NEED IT

// "use client";

// import { useEffect, useState } from "react";
// import { getCategories } from "@/actions/badget/get-categories";
// import { updateTransactionReview } from "@/actions/badget/update-transaction-review";
// import { format } from "date-fns";
// import { Check, MoreHorizontal } from "lucide-react";
// import { toast } from "sonner";

// import { Button } from "@dingify/ui/components/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@dingify/ui/components/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@dingify/ui/components/table";

// import { CategoryBadge } from "../buttons/CategoryBadge";

// export default function TransactionsToReview({ transactions }) {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const fetchedCategories = await getCategories();
//         setCategories(fetchedCategories as any);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       }
//     }

//     fetchCategories();
//   }, []);

//   const handleReviewTransaction = async (transactionId) => {
//     const response = await updateTransactionReview(transactionId);
//     if (response.success) {
//       toast.success("Transaction marked as reviewed");
//     } else {
//       toast.error("Failed to mark transaction as reviewed");
//     }
//   };

//   return (
//     <div className="flex items-center">
//       <Card>
//         <CardHeader className="px-7">
//           <CardTitle>Transactions to Review</CardTitle>
//           <CardDescription>Review your recent transactions.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Account</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Review</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {transactions.map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell>
//                     {transaction.date
//                       ? format(new Date(transaction.date), "dd MMMM yyyy")
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>{transaction.bankAccount.name}</TableCell>
//                   <TableCell>{transaction.description}</TableCell>
//                   <TableCell>
//                     <CategoryBadge
//                       transaction={transaction}
//                       categories={categories}
//                     />
//                   </TableCell>
//                   <TableCell>{transaction.amount}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       className="h-8 w-8 p-0"
//                       onClick={() => handleReviewTransaction(transaction.id)}
//                     >
//                       <span className="sr-only">Review</span>

//                       <Check className="h-4 w-4" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
