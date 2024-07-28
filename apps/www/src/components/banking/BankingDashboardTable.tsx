"use client";

import { useEffect, useState } from "react";
import { getUserCategories } from "@/actions/get-categories";
import { format, isToday, isYesterday } from "date-fns";
import { toast } from "sonner";

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
import { Tabs, TabsContent } from "@dingify/ui/components/tabs";

import { CategoryBadge } from "../buttons/CategoryBadge";

// Define CSS classes for column widths
const columnClasses = {
  description: "w-[300px]", // Adjust width as needed
  category: "w-[200px]", // Adjust width as needed
  amount: "w-[150px]", // Adjust width as needed
};

export default function BankingDashboardTable({
  transactions,
  setSelectedTransactionId,
  selectedTransactionId,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getUserCategories();
        console.log("fetchedCategories", fetchedCategories);
        setCategories(fetchedCategories as any);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Failed to fetch categories");
      }
    }

    fetchCategories();
  }, []);

  const handleTransactionClick = (transactionId) => {
    setSelectedTransactionId(transactionId);
  };

  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    let key = format(date, "PP");

    if (isToday(date)) {
      key = "Today";
    } else if (isYesterday(date)) {
      key = "Yesterday";
    }

    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(transaction);

    return groups;
  }, {});

  return (
    <>
      <Tabs defaultValue="week">
        <div className="flex items-center"></div>
        <TabsContent value="week">
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Monitor your recent transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(groupedTransactions).map((date) => (
                <div key={date}>
                  <h3 className="mt-4 text-lg font-semibold">{date}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className={columnClasses.description}>
                          Description
                        </TableHead>
                        <TableHead className={columnClasses.category}>
                          Category
                        </TableHead>
                        <TableHead className={columnClasses.amount}>
                          Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupedTransactions[date].map((transaction) => (
                        <TableRow
                          key={transaction.id}
                          onClick={() => handleTransactionClick(transaction.id)}
                          className={
                            selectedTransactionId === transaction.id
                              ? "bg-accent"
                              : ""
                          }
                        >
                          <TableCell className={columnClasses.description}>
                            {transaction.description}
                          </TableCell>
                          <TableCell className={columnClasses.category}>
                            <CategoryBadge
                              key={transaction.id}
                              transaction={transaction}
                              categories={categories}
                            />
                          </TableCell>
                          <TableCell className={columnClasses.amount}>
                            {transaction.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
