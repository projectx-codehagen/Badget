// actions/create-channel.ts
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function createChannel(channelName: string) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    // Fetch the user's projects to associate the channel with the first project found
    const projects = await prisma.project.findMany({
      where: { userId: userId },
      select: { id: true },
    });

    if (projects.length === 0) {
      throw new Error("No projects found for this user");
    }

    // Create a new channel within the first project
    const newChannel = await prisma.channel.create({
      data: {
        name: channelName,
        projectId: projects[0]!.id, // associate with the first project
      },
    });
    console.log(
      `Created channel with ID: ${newChannel.id} for project ID: ${projects[0]!.id}.`,
    );

    revalidatePath("/dashboard"); // Updates the cache for the dashboard page

    return { success: true, channel: newChannel };
  } catch (error) {
    console.error(`Error creating channel for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
