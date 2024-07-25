"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getTransactionsToReview() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        review: false,
        bankAccount: {
          userId: user.id,
        },
      },
      include: {
        category: true,
        bankAccount: true,
      },
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions to review:", error);
    throw new Error("Failed to fetch transactions to review");
  }
}
