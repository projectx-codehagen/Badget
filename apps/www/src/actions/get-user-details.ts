// actions/get-user-data.ts
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserData() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      apiKey: true,
      name: true,
      email: true,
      // add other fields you might need
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  return userData;
}
