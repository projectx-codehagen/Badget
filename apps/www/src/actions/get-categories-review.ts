"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getCategoriesReview() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  try {
    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}
