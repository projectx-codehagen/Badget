"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const budgetItems = [
  { category: "Income", description: "Monthly Salary", amount: "$3,200.00" },
  { category: "Expenses", description: "Groceries", amount: "$300.00" },
  { category: "Expenses", description: "Rent", amount: "$1,200.00" },
  { category: "Expenses", description: "Car Payment", amount: "$250.00" },
  { category: "Expenses", description: "Utilities", amount: "$150.00" },
  { category: "Savings", description: "Monthly Savings", amount: "$400.00" },
  { category: "Net", description: "Estimated Net", amount: "$900.00" },
  { category: "Leftover", description: "Leftover", amount: "$100.00" },
];

export function MonthlyBudgetTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your monthly budget</CardTitle>
        <CardDescription>
          Predictive budget based on you spendings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Monthly Budget Overview</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px] text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$6,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
