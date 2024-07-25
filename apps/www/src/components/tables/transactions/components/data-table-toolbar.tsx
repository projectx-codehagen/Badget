"use client";

import type { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getUserBankAccounts } from "@/actions/get-bankaccounts";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@dingify/ui/components/button";
import { Input } from "@dingify/ui/components/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface Category {
  name: string;
  id: string;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  handleReviewSelectedTransactions: () => Promise<void>;
  categories: Category[];
}

export function DataTableToolbar<TData>({
  table,
  handleReviewSelectedTransactions,
  categories,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [accounts, setAccounts] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const fetchedAccounts = await getUserBankAccounts();
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    }
    fetchAccounts();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter descriptions..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={[
              { label: "Uncategorized", value: "Uncategorized" },
              ...categories.map((cat) => ({
                label: cat.name,
                value: cat.name,
              })),
            ]}
          />
        )}
        {table.getColumn("bankAccount") && (
          <DataTableFacetedFilter
            column={table.getColumn("bankAccount")}
            title="Account"
            options={accounts.map((account) => ({
              label: account.name,
              value: account.id,
            }))}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
      <Button
        variant="outline"
        size="sm"
        onClick={handleReviewSelectedTransactions}
        disabled={table.getFilteredSelectedRowModel().rows.length === 0}
        className="ml-2  h-8 lg:flex"
      >
        Mark {table.getFilteredSelectedRowModel().rows.length} as reviewed
      </Button>
    </div>
  );
}
