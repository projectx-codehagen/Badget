"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface UpdateBudgetData {
  id: string;
  budgetName: string;
  categories: Record<string, number>;
}

export async function updateBudget(data: UpdateBudgetData) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const updatedBudget = await prisma.budget.update({
      where: { id: data.id, userId: user.id },
      data: {
        name: data.budgetName,
        categories: {
          upsert: Object.entries(data.categories).map(
            ([categoryId, amount]) => ({
              where: { budgetId_categoryId: { budgetId: data.id, categoryId } },
              update: { amount },
              create: { categoryId, amount },
            }),
          ),
        },
      },
      include: {
        categories: true,
      },
    });

    revalidatePath("/dashboard/categories");

    return { success: true, data: updatedBudget };
  } catch (error) {
    console.error("Error updating budget:", error);
    return { success: false, error: "Failed to update budget" };
  }
}
