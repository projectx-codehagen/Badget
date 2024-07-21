"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function addInvestmentAccount(data: {
  name: string;
  currencyIso: string;
  accountType: string;
  amount: number;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const account = await prisma.bankaccount.create({
    data: {
      ...data,
      userId: user.id,
      originalPayload: {},
    },
  });

  return account;
}
