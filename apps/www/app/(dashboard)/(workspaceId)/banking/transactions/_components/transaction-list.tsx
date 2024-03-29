"use client";

import * as React from "react";
import { api } from "@/trpc/client";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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
  compareAsc,
  compareDesc,
  format,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";
import {
  ArrowRightLeftIcon,
  BadgeDollarSign,
  Building,
  Car,
  Check,
  Divide,
  Mail,
  MessageSquare,
  PlusCircle,
  Repeat2,
  ShoppingCartIcon,
} from "lucide-react";

import { CreateTransaction } from "@projectx/validators";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Transaction } from "../data";

// Define the icon mapping
// const labelToIconMap = {
//   Subscriptions: <BadgeDollarSign />,
//   Car: <Car />, // Use the actual icon component
//   House: <Building />,
//   Food: <ShoppingCartIcon />,
//   // Add other mappings as needed
// };

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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      let badgeVariant = "default";

      // return (
      //   // @ts-ignore
      //   <Badge variant={badgeVariant}>
      //     <span className="ml-2">{""}</span>
      //   </Badge>
      // );
      return <div className="capitalize">{row.getValue("category")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             <Check className="mr-2 h-4 w-4" />
  //             <span>Review</span>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Divide className="mr-2 h-4 w-4" />
  //             <span>Split</span>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Repeat2 className="mr-2 h-4 w-4" />
  //             <span>Recurring</span>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuSub>
  //             <DropdownMenuSubTrigger>
  //               <ArrowRightLeftIcon className="mr-2 h-4 w-4" />
  //               <span>Transaction Type</span>
  //             </DropdownMenuSubTrigger>
  //             <DropdownMenuPortal>
  //               <DropdownMenuSubContent>
  //                 <DropdownMenuItem>
  //                   <Mail className="mr-2 h-4 w-4" />
  //                   <span>Internal transfer</span>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuItem>
  //                   <MessageSquare className="mr-2 h-4 w-4" />
  //                   <span>Regular</span>
  //                 </DropdownMenuItem>
  //                 <DropdownMenuSeparator />
  //                 <DropdownMenuItem>
  //                   <PlusCircle className="mr-2 h-4 w-4" />
  //                   <span>More...</span>
  //                 </DropdownMenuItem>
  //               </DropdownMenuSubContent>
  //             </DropdownMenuPortal>
  //           </DropdownMenuSub>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export function TransactionList({ data }: { data: Transaction[] }) {
  const transactionList = data;
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

  const formatDate = (dateString: string) => {
    const date = parseISO(new Date(dateString).toISOString());
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      // Example format: Wed, February 14
      return format(date, "EEE, MMMM d");
    }
  };

  const groupedData = React.useMemo(() => {
    // Sort the items by date in descending order so the most recent dates come first
    const sortedItems = transactionList.sort((a, b) =>
      compareDesc(parseISO(a.date.toString()), parseISO(b.date.toString())),
    );

    // Group items by "today", "yesterday", or specific date format
    return sortedItems.reduce(
      (acc, item) => {
        const formattedDate = formatDate(item.date.toString()); // Use formatDate here
        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate]!.push(item);
        return acc;
      },
      {} as Record<string, Transaction[]>,
    );
  }, [transactionList]); // No need to depend on formatDate if it's not changing

  return (
    <div className="mt-4">
      {Object.entries(groupedData).map(([monthYear, payments]) => (
        <React.Fragment key={monthYear}>
          <h2 className="ml-4 text-lg font-semibold">{monthYear}</h2>
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
        </React.Fragment>
      ))}
    </div>
  );
}
