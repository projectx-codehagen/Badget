// actions/get-transactions.ts
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
      OR: [
        {
          bankaccount: {
            userId: user.id,
          },
        },
        {
          asset: {
            userId: user.id,
          },
        },
      ],
    },
    select: {
      id: true,
      amount: true,
      date: true,
      description: true,
      bankaccount: {
        select: {
          name: true,
        },
      },
      asset: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
          icon: true,
        },
      },
      currency: {
        select: {
          iso: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions;
}
