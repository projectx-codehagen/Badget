"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getTransactionsForCategory(categoryId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      categoryId: categoryId,
      category: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      date: true,
      description: true,
      amount: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 10, // Limit to 10 most recent transactions
  });

  return transactions.map((transaction) => ({
    id: transaction.id,
    date: transaction.date,
    description: transaction.description,
    category: transaction.category?.name,
    amount: Number(transaction.amount), // Convert Decimal to number
  }));
}
