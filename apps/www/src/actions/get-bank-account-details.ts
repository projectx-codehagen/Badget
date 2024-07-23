"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getBankAccountDetails(bankAccountId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch bank account details
  const bankAccount = await prisma.bankAccount.findFirst({
    where: {
      id: bankAccountId,
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      initialAmount: true,
      accountType: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return bankAccount;
}
