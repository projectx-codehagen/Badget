"use client";

import * as React from "react";
import { Badge } from "@/apps/www/components/ui/badge";
import { Button } from "@/apps/www/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/apps/www/components/ui/card";
import { Checkbox } from "@/apps/www/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/apps/www/components/ui/dropdown-menu";
import { Input } from "@/apps/www/components/ui/input";
import { Progress } from "@/apps/www/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/apps/www/components/ui/table";
import { BoltIcon } from "@heroicons/react/20/solid";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
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
  ArrowRightLeftIcon,
  BadgeDollarSign,
  Building,
  Car,
  CarIcon,
  Check,
  CoffeeIcon,
  CreditCard,
  Divide,
  HomeIcon,
  KeyIcon,
  Mail,
  MessageSquare,
  PlusCircle,
  Repeat2,
  Settings,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StarIcon,
  UserPlus,
} from "lucide-react";

const data: Category[] = [
  {
    id: "home",
    name: "Home",
    icon: "Home",
    current: 1000,
    max: 2050,
  },
  {
    id: "car",
    name: "Car & Transportation",
    icon: "Car",
    current: 2022,
    max: 2050,
  },
  {
    id: "rent",
    name: "Rent",
    icon: "Key",
    current: 1984,
    max: 2000,
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "Bolt",
    current: 38,
    max: 50,
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: "Star",
    current: 35,
    max: 200,
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "ShoppingBag",
    current: 15,
    max: 250,
  },
  {
    id: "food",
    name: "Food & Drink",
    icon: "Coffee",
    current: 0,
    max: 450,
  },
];

export type Category = {
  id: string;
  name: string;
  icon: string;
  current: number;
  max: number;
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
          {iconMap[icon]} {/* Render the corresponding icon */}
          <div className="capitalize">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "current",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const current = parseFloat(row.getValue("current"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(current);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const current = row.getValue("current") as number;
      const max = row.getValue("max") as number;
      const progressPercent = (current / max) * 100; // Calculate progress percentage

      return (
        <div className="w-full px-2">
          <Progress value={progressPercent} className="w-full" />
        </div>
      );
    },
  },
  {
    accessorKey: "max",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const max = parseFloat(row.getValue("max"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(max);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function TopCategoriesTable() {
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
    <Card>
      <CardHeader>
        <CardTitle>Top categories</CardTitle>
        <CardDescription>Where do you use most money?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
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
        </div>
      </CardContent>
    </Card>
  );
}
