import React from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

const BankAccountsTable = ({ bankAccounts }) => {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>
            View and manage all your bank accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Initial Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Transaction</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/banking/${account.id}`}>
                      <div>{account.name}</div>
                      <div className="text-sm text-muted-foreground">
                        *{account.id.slice(-4)}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{account.initialAmount || "$0.00"}</TableCell>
                  <TableCell>{account.accountType || "Unknown"}</TableCell>
                  <TableCell>
                    <div>{account.lastTransactionDate || "N/A"}</div>
                    <div className="text-sm text-muted-foreground">
                      {account.lastTransactionDescription || "No transactions"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Transfer Funds</DropdownMenuItem>
                        <DropdownMenuItem>Manage Account</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankAccountsTable;
