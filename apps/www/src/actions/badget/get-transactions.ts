"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserTransactions() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch transactions associated with the user
  const transactions = await prisma.transaction.findMany({
    where: {
      bankAccount: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      amount: true,
      date: true,
      description: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return transactions;
}
