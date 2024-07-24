/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@dingify/ui/components/button";
import { Checkbox } from "@dingify/ui/components/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

export interface Account {
  id: string;
  iban: string;
  owner_name: string;
  balances: {
    balanceAmount: {
      amount: string;
      currency: string;
    };
    balanceType: string;
    referenceDate: string;
  }[];
}

interface AccountsToSelectTableProps {
  data: Account[];
  onSelectionChange: (selectedAccounts: string[]) => void;
}

export const columns: ColumnDef<Account>[] = [
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
    accessorKey: "iban",
    header: "IBAN",
    cell: ({ row }) => <div>{row.getValue("iban")}</div>,
  },
  {
    accessorKey: "owner_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("owner_name")}</div>,
  },
  {
    accessorKey: "balances",
    header: "Balance",
    cell: ({ row }) => {
      const balances = row.getValue("balances") as Account["balances"];
      const mainBalance = balances.find(
        (b) =>
          b.balanceType === "interimAvailable" ||
          b.balanceType === "closingBooked",
      );
      return mainBalance ? (
        <div>{`${mainBalance.balanceAmount.amount} ${mainBalance.balanceAmount.currency}`}</div>
      ) : (
        <div>N/A</div>
      );
    },
  },
];

export function AccountsToSelectTable({
  data,
  onSelectionChange,
}: AccountsToSelectTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    const selectedAccountIds = Object.keys(rowSelection).map(
      (index) => data[parseInt(index)].id,
    );
    onSelectionChange(selectedAccountIds);
  }, [rowSelection, data, onSelectionChange]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
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
                  No accounts found.
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
      </div>
    </div>
  );
}
