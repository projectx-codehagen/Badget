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

  // Ensure default categories are created
  const defaultCategories = [
    { name: "Car", icon: "🚗" },
    { name: "Transportation", icon: "🚌" },
    { name: "Clothing", icon: "👗" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Groceries", icon: "🥑" },
    { name: "Other", icon: "🔧" },
    { name: "Rent", icon: "🏠" },
    { name: "Restaurants", icon: "🍽️" },
    { name: "Shops", icon: "🛍️" },
    { name: "Subscriptions", icon: "📺" },
    { name: "Utilities", icon: "💡" },
  ];

  await Promise.all(
    defaultCategories.map(async (category) => {
      await prisma.category.upsert({
        where: {
          name_userId: {
            name: category.name,
            userId: user.id,
          },
        },
        update: {},
        create: {
          name: category.name,
          icon: category.icon,
          userId: user.id,
        },
      });
    }),
  );

  // Fetch or create categories
  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });

  const categoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category.id;
    return acc;
  }, {});

  // Prepare transactions for insertion
  const transactionsData = transactions.map((transaction) => ({
    amount: transaction.amount,
    date: new Date(transaction.date),
    description: transaction.description,
    categoryId: categoryMap[transaction.category] || categoryMap["Other"],
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
