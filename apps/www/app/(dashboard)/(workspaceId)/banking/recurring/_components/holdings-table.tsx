"use client";

import * as React from "react";
import Image from "next/image";
import { BoltIcon } from "@heroicons/react/20/solid";
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
  CoffeeIcon,
  HomeIcon,
  KeyIcon,
  ShoppingBagIcon,
  StarIcon,
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: "1",
    name: "Apple Inc.",
    ticker: "AAPL",
    current: 150,
    totalpercentage: 20,
    dataPoints: [
      { time: "2022-Q1", value: 100 },
      { time: "2022-Q2", value: 200 },
      { time: "2022-Q3", value: 150 },
      { time: "2022-Q4", value: 120 },
    ],
  },
  {
    id: "2",
    name: "Microsoft Corp.",
    ticker: "MSFT",
    current: 250,
    totalpercentage: 25,
    dataPoints: [
      { time: "2022-Q1", value: 500 },
      { time: "2022-Q2", value: 200 },
      { time: "2022-Q3", value: 100 },
      { time: "2022-Q4", value: 300 },
    ],
  },
  {
    id: "3",
    name: "Tesla Inc.",
    ticker: "TSLA",
    current: 300,
    totalpercentage: 15,
    dataPoints: [
      { time: "2022-Q1", value: 10 },
      { time: "2022-Q2", value: 290 },
      { time: "2022-Q3", value: 300 },
      { time: "2022-Q4", value: 310 },
    ],
  },
  {
    id: "4",
    name: "Amazon.com Inc.",
    ticker: "AMZN",
    current: 320,
    totalpercentage: 10,
    dataPoints: [
      { time: "2022-Q1", value: 10 },
      { time: "2022-Q2", value: 330 },
      { time: "2022-Q3", value: 340 },
      { time: "2022-Q4", value: 20 },
    ],
  },
  {
    id: "5",
    name: "Alphabet Inc.(Google)",
    ticker: "GOOGL",
    current: 280,
    totalpercentage: 15,
    dataPoints: [
      { time: "2022-Q1", value: 700 },
      { time: "2022-Q2", value: 30 },
      { time: "2022-Q3", value: 20 },
      { time: "2022-Q4", value: 10 },
    ],
  },
  {
    id: "6",
    name: "Facebook (Meta Platforms Inc.)",
    ticker: "FB",
    current: 200,
    totalpercentage: 15,
    dataPoints: [
      { time: "2022-Q1", value: 220 },
      { time: "2022-Q2", value: 210 },
      { time: "2022-Q3", value: 205 },
      { time: "2022-Q4", value: 200 },
    ],
  },
];

export type Category = {
  id: string;
  name: string;
  ticker: string;
  current: number;
  totalpercentage: number;
  dataPoints: { time: string; value: number }[];
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
const iconMaptoCDN = (iconName: string) => {
  // @ts-ignore
  const sanitizedWord = iconName.split(/\W+/)[0].toLowerCase();
  return (
    <Image
      className="mr-2 h-5 w-5"
      width={20}
      height={20}
      src={`https://s3-symbol-logo.tradingview.com/${sanitizedWord}--big.svg`}
      alt={`${sanitizedWord}`}
    />
  );
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="flex items-center">
          {iconMaptoCDN(name)}
          <div className="capitalize">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "ticker",
    header: "Ticker",
    cell: ({ row }) => {
      const ticker = row.getValue("ticker") as string;
      return (
        <div className="flex items-center">
          <div className="capitalize">{ticker}</div>
        </div>
      );
    },
  },
  {
    id: "lineChart",
    header: "Graph",
    cell: ({ row }) => {
      const dataPoints = row.original.dataPoints; // Assuming you have time series data in 'dataPoints'

      return (
        <div className="flex h-[20px] w-[80px] items-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dataPoints}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Line
                type="monotone"
                dataKey="value" // Adjust based on your data structure
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    },
  },
  {
    accessorKey: "current",
    header: () => <div className="text-right">Change</div>,
    cell: ({ row }) => {
      const current = parseFloat(row.getValue("current"));
      const totalPortfolioValue = data.reduce(
        (sum, item) => sum + item.current,
        0,
      );
      const categoryPercentage = (current / totalPortfolioValue) * 100;

      const formattedPercentage = categoryPercentage.toFixed(2) + "%"; // Format the percentage to two decimal places

      return (
        <div className="text-right font-medium">{formattedPercentage}</div>
      );
    },
  },
  {
    accessorKey: "max",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const max = parseFloat(row.getValue("current"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(max);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function HoldingsTable() {
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
