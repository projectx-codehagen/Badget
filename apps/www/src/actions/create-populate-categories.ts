"use server";

import { prisma } from "@/lib/db";

export async function createPopulateCategories() {
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

  try {
    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}
