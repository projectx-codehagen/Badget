"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getChannelDetails(channelId: string) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  if (!channelId || typeof channelId !== "string") {
    throw new Error("Channel ID is required and must be a string");
  }

  const channel = await prisma.channel.findUnique({
    where: { id: channelId },
    include: {
      project: true,
      events: true,
    },
  });

  if (!channel || channel.project.userId !== userId) {
    throw new Error("Channel not found or you do not have access to it");
  }

  return channel;
}
