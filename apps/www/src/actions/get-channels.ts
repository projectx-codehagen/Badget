"use server";

// actions/get-channels.ts
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserChannels() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch projects associated with the user
  const projects = await prisma.project.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  // Extract project IDs
  const projectIds = projects.map((project) => project.id);

  // Fetch channels for the user's projects
  const channels = await prisma.channel.findMany({
    where: {
      projectId: {
        in: projectIds,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return channels;
}
