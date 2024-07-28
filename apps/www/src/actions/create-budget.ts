"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface BudgetData {
  budgetName: string;
  categories: Record<string, number>;
}

export async function createBudget(data: BudgetData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 5);

  try {
    const budget = await prisma.budget.create({
      data: {
        name: data.budgetName,
        startDate,
        endDate,
        amount: Object.values(data.categories).reduce(
          (sum, amount) => sum + amount,
          0,
        ),
        userId: user.id,
        categories: {
          create: Object.entries(data.categories).map(
            ([categoryId, amount]) => ({
              amount,
              categoryId,
            }),
          ),
        },
      },
      include: {
        categories: true,
      },
    });

    // Revalidate the categories page to reflect the new budget
    revalidatePath("/dashboard/categories");

    return { success: true, data: budget };
  } catch (error) {
    console.error("Error creating budget:", error);
    return { success: false, error: "Failed to create budget" };
  }
}
