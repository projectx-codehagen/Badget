"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserBankAccounts() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch bank accounts associated with the user
  const bankAccounts = await prisma.bankAccount.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      resourceId: true,
      initialAmount: true,
      accountType: true,
    },
  });

  return bankAccounts;
}
