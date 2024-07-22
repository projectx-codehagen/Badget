"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getBankAccountTransactions(bankAccountId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch transactions associated with the bank account
  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: bankAccountId,
      bankAccount: {
        userId: user.id,
      },
    },
    select: {
      id: true,
      amount: true,
      date: true,
      description: true,
      category: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions;
}
