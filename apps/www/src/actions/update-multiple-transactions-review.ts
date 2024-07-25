"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function updateMultipleTransactionReviews(
  transactionIds: string[],
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.transaction.updateMany({
      where: { id: { in: transactionIds } },
      data: { review: true },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating multiple transaction reviews:", error);
    return { success: false, error: error.message };
  }
}
