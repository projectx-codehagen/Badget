// actions/get-user-credits.js
"use server";

import { getCurrentUser } from "@/lib/session";

import { prisma } from "@dingify/db";

export async function getUserCredits() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user found for fetching credits.");
    return { success: false, error: "No user found." };
  }

  try {
    const userWithCredits = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true },
    });

    if (userWithCredits) {
      console.log(
        `Credits for user ID: ${userId} are ${userWithCredits.credits}`
      );
      return { success: true, credits: userWithCredits.credits };
    } else {
      console.error(`No user found with ID: ${userId}`);
      return { success: false, error: "User not found." };
    }
  } catch (error) {
    console.error(`Error fetching credits for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
