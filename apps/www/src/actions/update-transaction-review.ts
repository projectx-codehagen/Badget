// actions/update-transaction-review.ts
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function updateTransactionReview(transactionId: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { review: true },
    });

    revalidatePath("/dashboard");

    return { success: true, transaction: updatedTransaction };
  } catch (error) {
    console.error("Error updating transaction review:", error);
    return { success: false, error: error.message };
  }
}
