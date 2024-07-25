// actions/update-category.ts
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function updateCategoryReviewTable(
  transactionId: string,
  categoryId: string,
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { categoryId: categoryId },
    });

    revalidatePath("/dashboard/banking");

    return { success: true, data: updatedTransaction };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}
