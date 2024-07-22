"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/actions/badget/get-categories";
import { updateTransactionReview } from "@/actions/badget/update-transaction-review";
import { format } from "date-fns";
import { Check, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";

import { CategoryBadge } from "../buttons/CategoryBadge";

export default function TransactionsToReview({ transactions }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories as any);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }

    fetchCategories();
  }, []);

  const handleReviewTransaction = async (transactionId) => {
    const response = await updateTransactionReview(transactionId);
    if (response.success) {
      toast.success("Transaction marked as reviewed");
    } else {
      toast.error("Failed to mark transaction as reviewed");
    }
  };

  return (
    <div className="flex items-center">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Transactions to Review</CardTitle>
          <CardDescription>Review your recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {transaction.date
                      ? format(new Date(transaction.date), "dd MMMM yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{transaction.bankAccount.name}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <CategoryBadge
                      transaction={transaction}
                      categories={categories}
                    />
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleReviewTransaction(transaction.id)}
                    >
                      <span className="sr-only">Review</span>

                      <Check className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
