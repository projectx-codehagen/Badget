"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import { Checkbox } from "@dingify/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";

import { propertyLabels, propertyStatuses } from "./propertystatus";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Property = {
  id: string;
  address: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "DONE" | "CANCELED";
  label: "APARTMENT" | "HOUSE" | "CABIN" | "PROPERTY";
};

export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const propertyLabel = propertyLabels.find(
        (label) => label.value === row.original.label
      );

      return (
        <div className="flex w-full space-x-2 md:w-[500px]">
          <Badge variant="outline">{propertyLabel?.label}</Badge>
          <Link href={`/property/${row.original.id}`}>
            <span className="truncate font-medium">{row.original.address}</span>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="hidden md:block">Status</div>,
    cell: ({ row }) => {
      const status = propertyStatuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="hidden items-center md:flex">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
