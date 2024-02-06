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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: SalaryBand[] = [
  {
    id: "1",
    title: "Software Engineer - Intern",
    seniority: "Intern",
    salary: "$30,000",
  },
  {
    id: "2",
    title: "Software Engineer - I",
    seniority: "Junior",
    salary: "$60,000",
  },
  {
    id: "3",
    title: "Software Engineer - II",
    seniority: "Mid",
    salary: "$80,000",
  },
  {
    id: "4",
    title: "Software Engineer - III",
    seniority: "Senior",
    salary: "$100,000",
  },
  {
    id: "5",
    title: "Software Engineer - IV",
    seniority: "Principal",
    salary: "$120,000",
  },
  { id: "6", title: "Designer - III", seniority: "Senior", salary: "$100,000" },
  {
    id: "7",
    title: "Designer - IV",
    seniority: "Principal",
    salary: "$120,000",
  },
  { id: "8", title: "Marketer - I", seniority: "Junior", salary: "$50,000" },
  { id: "9", title: "Marketer - II", seniority: "Mid", salary: "$65,000" },
  { id: "10", title: "Marketer - III", seniority: "Senior", salary: "$80,000" },
];

export type SalaryBand = {
  id: string;
  title: string;
  seniority: string;
  salary: string;
};

export const columns: ColumnDef<SalaryBand>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "seniority",
    header: "Seniority",
    cell: ({ row }) => <div>{row.getValue("seniority")}</div>,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <div>{row.getValue("salary")}</div>,
  },
];

export function OpenSalaryTable() {
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
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-4 text-left font-heading text-xl leading-[1.1]">
          Global Salary Bands
        </h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
      </div>
    </section>
  );
}
