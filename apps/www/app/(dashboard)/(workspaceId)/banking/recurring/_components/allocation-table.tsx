"use client";

import * as React from "react";
import { BoltIcon, MusicalNoteIcon } from "@heroicons/react/20/solid";
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
  CarIcon,
  Check,
  CloudIcon,
  CoffeeIcon,
  CreditCard,
  HomeIcon,
  KeyIcon,
  PhoneIcon,
  Settings,
  ShoppingBagIcon,
  StarIcon,
  WifiIcon,
} from "lucide-react";

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
    id: "streaming",
    name: "Netflix",
    icon: "Settings", // Change to an appropriate icon
    current: 15, // Example budget for streaming services
    spent: 15, // Example spent amount
    totalpercentage: 2, // Adjust as needed
    date: "2023-01-01",
    paid: true,
  },
  {
    id: "software",
    name: "Spotify",
    icon: "CreditCard", // Change to an appropriate icon
    current: 50,
    spent: 50,
    totalpercentage: 2,
    date: "2023-01-02",
    paid: true,
  },
  {
    id: "gym",
    name: "Gym Membership",
    icon: "Star", // Change to an appropriate icon
    current: 25,
    spent: 25,
    totalpercentage: 2,
    date: "2023-01-05",
    paid: true,
  },
  {
    id: "phone",
    name: "Phone Bill",
    icon: "Phone", // Change to an appropriate icon
    current: 50, // Example budget
    spent: 50, // Actual spent
    totalpercentage: 2,
    date: "2023-01-20",
    paid: true,
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "Bolt", // Change to an appropriate icon
    current: 100, // Example budget
    spent: 95, // Actual spent
    totalpercentage: 2,
    date: "2023-01-22",
    paid: false,
  },
  {
    id: "internet",
    name: "Internet Service",
    icon: "Wifi", // Change to an appropriate icon
    current: 40, // Example budget
    spent: 40, // Actual spent
    totalpercentage: 2,
    date: "2023-01-25",
    paid: false,
  },
  {
    id: "streamingMusic",
    name: "Apple Music",
    icon: "Music", // Change to an appropriate icon
    current: 10, // Example budget
    spent: 10, // Actual spent
    totalpercentage: 2,
    date: "2023-01-28",
    paid: false,
  },
  {
    id: "cloudStorage",
    name: "Cloud Storage",
    icon: "Cloud", // Change to an appropriate icon
    current: 5, // Example budget
    spent: 5, // Actual spent
    totalpercentage: 2,
    date: "2023-01-30",
    paid: false,
  },
];

export type Category = {
  id: string;
  name: string;
  icon: string;
  current: number;
  spent: number;
  totalpercentage: number;
  date: string;
  paid: boolean;
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
  Phone: <PhoneIcon className="mr-2 h-5 w-5" />,
  Wifi: <WifiIcon className="mr-2 h-5 w-5" />,
  Music: <MusicalNoteIcon className="mr-2 h-5 w-5" />,
  Cloud: <CloudIcon className="mr-2 h-5 w-5" />,
};

export const columns: ColumnDef<Category>[] = [
  {
    id: "date",
    accessorFn: (row) => new Date(row.date), // Accessor function for date
    header: () => <div>Date</div>,
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }); // Format date as "Jan 1st"
    },
  },
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
    accessorKey: "current",
    header: () => <div className="text-right">Cost</div>,
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
  {
    id: "paid",
    header: () => <div className="text-right">Paid</div>,
    cell: ({ row }) => {
      const isPaid = row.original.paid;
      return (
        <div className="flex h-full items-center justify-end">
          {isPaid ? <Check className="mr-2 h-5 w-5 text-right" /> : null}
        </div>
      );
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
      <h2 className="text-lg font-semibold">This month</h2>
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
