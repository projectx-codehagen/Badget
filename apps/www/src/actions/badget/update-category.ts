// actions/update-category.ts
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function updateCategory(transactionId, categoryName) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const categories = await prisma.category.findMany({
    where: { userId: user.id },
  });

  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
  );

  if (!category) {
    throw new Error("Category not found");
  }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { categoryId: category.id },
    });
    return { success: true, transaction: updatedTransaction };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: error.message };
  }
}
