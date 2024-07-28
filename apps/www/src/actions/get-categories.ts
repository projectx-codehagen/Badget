// actions/get-categories.ts
"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserCategories() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      icon: true,
      _count: {
        select: { transactions: true },
      },
      transactions: {
        select: {
          amount: true,
        },
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    icon: category.icon,
    spent: category.transactions.reduce(
      (sum, transaction) => sum + Number(transaction.amount.toString()),
      0,
    ),
    budget: 0, // You'll need to add budget information to your schema and fetch it here
    _count: category._count,
  }));
}
