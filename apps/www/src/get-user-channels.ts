// actions/get-user-channels.js
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserChannels() {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    const channels = await prisma.channel.findMany({
      where: {
        project: {
          userId: userId,
        },
      },
      include: {
        project: true,
      },
    });

    return { success: true, channels };
  } catch (error) {
    console.error(`Error fetching channels for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
