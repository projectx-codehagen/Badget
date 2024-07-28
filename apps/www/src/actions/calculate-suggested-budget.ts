"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function calculateSuggestedBudget() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  try {
    const categorySums = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        category: {
          userId: user.id,
        },
        date: {
          gte: oneMonthAgo,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const categories = await prisma.category.findMany({
      where: { userId: user.id },
      select: { id: true, name: true, icon: true },
    });

    const suggestedBudget = categories.map((category) => {
      const sum = categorySums.find((sum) => sum.categoryId === category.id);
      return {
        id: category.id,
        name: category.name,
        icon: category.icon,
        suggestedAmount: Math.ceil(Math.abs(Number(sum?._sum?.amount ?? 0))),
      };
    });

    return suggestedBudget;
  } catch (error) {
    console.error("Error calculating suggested budget:", error);
    throw new Error("Failed to calculate suggested budget");
  }
}
