"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  category: string;
}

export async function importTransactions(
  bankAccountId: string,
  transactions: Transaction[],
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const currencyIso = "USD"; // Set the currency ISO code according to your requirements

  // Fetch existing categories for the user
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category.id;
    return acc;
  }, {});

  // Ensure the "Other" category is available
  const otherCategoryId = categoryMap["Other"];

  // Prepare transactions for insertion
  const transactionsData = transactions.map((transaction) => ({
    amount: transaction.amount,
    date: new Date(transaction.date),
    description: transaction.description,
    categoryId: categoryMap[transaction.category] || otherCategoryId,
    accountId: bankAccountId,
    currencyIso: currencyIso,
  }));

  try {
    await prisma.transaction.createMany({
      data: transactionsData,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
