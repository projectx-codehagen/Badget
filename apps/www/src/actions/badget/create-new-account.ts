"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

interface AccountData {
  name: string;
}

export async function createNewAccount(data) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    const newAccount = await prisma.bankAccount.create({
      data: {
        name: data.name,
        userId: userId,
        initialAmount: data.initialAmount,
        accountType: data.accountType,
        originalPayload: {},
      },
    });

    // revalidatePath(currentPath);

    console.log(
      `Created bank account with ID: ${newAccount.id} for user ID: ${userId}.`,
    );

    revalidatePath("/dashboard"); // Updates the cache for the dashboard page

    return { success: true, account: newAccount };
  } catch (error) {
    console.error(`Error creating bank account for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
