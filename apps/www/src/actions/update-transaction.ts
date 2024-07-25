"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface UpdateTransactionData {
  id: string;
  accountId?: string;
  assetId?: string;
  currencyIso?: string;
  categoryId?: string;
  amount?: number;
  date?: Date;
  description?: string;
  review?: boolean;
}

export async function updateTransaction(data: UpdateTransactionData) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: data.id },
      data: {
        accountId: data.accountId,
        assetId: data.assetId,
        currencyIso: data.currencyIso,
        categoryId: data.categoryId,
        date: data.date,
        description: data.description,
        review: data.review,
      },
    });

    revalidatePath("/dashboard");

    console.log(`Updated transaction with ID: ${updatedTransaction.id}`);

    return { success: true, transaction: updatedTransaction };
  } catch (error) {
    console.error(`Error updating transaction: ${error.message}`);
    return { success: false, error: error.message };
  }
}
