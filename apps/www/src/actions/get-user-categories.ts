import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserCategories() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch categories associated with the user
  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      name: true,
      icon: true,
      _count: {
        select: { transactions: true },
      },
    },
  });

  return categories;
}
