"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserBudget() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentDate = new Date();

  // Fetch the most recent budget that includes the current date
  const budget = await prisma.budget.findFirst({
    where: {
      userId: user.id,
      startDate: { lte: currentDate },
      endDate: { gte: currentDate },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      startDate: "desc",
    },
  });

  if (!budget) {
    return null; // Or you could return a default budget structure
  }

  // Transform the data to match the structure expected by your components
  return {
    id: budget.id,
    name: budget.name,
    startDate: budget.startDate,
    endDate: budget.endDate,
    amount: Number(budget.amount),
    categories: budget.categories.map((cb) => ({
      id: cb.category.id,
      name: cb.category.name,
      icon: cb.category.icon,
      budget: Number(cb.amount),
    })),
  };
}
