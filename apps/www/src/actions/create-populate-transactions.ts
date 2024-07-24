"use server";

import { subDays } from "date-fns";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function createPopulateTransactions(bankAccountId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const currencyIso = "USD"; // Set the currency ISO code according to your requirements

  // Check if the currency exists, if not create it
  await prisma.currency.upsert({
    where: { iso: currencyIso },
    update: {},
    create: {
      iso: currencyIso,
      symbol: "$",
    },
  });

  // Categories to be created
  const categories = [
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

  // Populate categories with userId
  await Promise.all(
    categories.map(async (category) => {
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

  // Fetch category IDs
  const createdCategories = await prisma.category.findMany({
    where: { userId: user.id },
  });
  const categoryMap = createdCategories.reduce((acc, category) => {
    acc[category.name] = category.id;
    return acc;
  }, {});

  // Sample transactions with various realistic descriptions, dates, and categories
  const transactions = [
    {
      amount: 46,
      date: new Date(),
      description: "Groceries at Walmart",
      categoryId: categoryMap["Groceries"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
      review: true, // Mark as reviewed
    },
    {
      amount: 17,
      date: subDays(new Date(), 1), // Yesterday
      description: "Lunch at Chipotle",
      categoryId: categoryMap["Restaurants"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
      review: true, // Mark as reviewed
    },
    {
      amount: 10,
      date: subDays(new Date(), 2),
      description: "Netflix Subscription",
      categoryId: categoryMap["Subscriptions"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 55,
      date: subDays(new Date(), 3),
      description: "Gas at Chevron",
      categoryId: categoryMap["Car"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 120,
      date: subDays(new Date(), 4),
      description: "New Shoes from Nike",
      categoryId: categoryMap["Shops"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 2000,
      date: subDays(new Date(), 5),
      description: "Monthly Salary",
      categoryId: categoryMap["Income"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 36,
      date: subDays(new Date(), 6),
      description: "Dinner at Olive Garden",
      categoryId: categoryMap["Restaurants"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 15,
      date: subDays(new Date(), 7),
      description: "Movie Ticket",
      categoryId: categoryMap["Entertainment"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 90,
      date: subDays(new Date(), 8),
      description: "Electricity Bill",
      categoryId: categoryMap["Utilities"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
    {
      amount: 50,
      date: subDays(new Date(), 9),
      description: "Gym Membership",
      categoryId: categoryMap["Fitness"],
      accountId: bankAccountId,
      currencyIso: currencyIso,
    },
  ];

  try {
    await prisma.transaction.createMany({
      data: transactions,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
