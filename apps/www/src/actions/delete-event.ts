"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function deleteEvent(eventId) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      channel: {
        include: {
          project: true,
        },
      },
    },
  });

  if (!event || event.channel.project.userId !== user.id) {
    throw new Error(
      "Event not found or you don't have permission to delete this event",
    );
  }

  await prisma.event.delete({
    where: { id: eventId },
  });

  return { success: true };
}
