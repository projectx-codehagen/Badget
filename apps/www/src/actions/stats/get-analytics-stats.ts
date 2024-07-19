"use server";

import { endOfMonth, startOfMonth, subMonths } from "date-fns";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getAnalyticsStats() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch projects associated with the user
  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    select: { id: true },
  });

  const projectIds = projects.map((project) => project.id);

  const channels = await prisma.channel.findMany({
    where: { projectId: { in: projectIds } },
    select: { id: true },
  });

  const channelIds = channels.map((channel) => channel.id);

  const today = new Date();
  const startOfCurrentYear = new Date(today.getFullYear(), 0, 1);
  const endOfCurrentYear = new Date(today.getFullYear(), 11, 31);

  // Fetch monthly event data for the current year
  const monthlyEvents = await prisma.event.findMany({
    where: {
      channelId: { in: channelIds },
      createdAt: {
        gte: startOfCurrentYear,
        lte: endOfCurrentYear,
      },
    },
    select: {
      createdAt: true,
    },
  });

  const monthlyEventsCount = monthlyEvents.reduce((acc, event) => {
    const month = event.createdAt.toLocaleString("default", { month: "short" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {});

  const formattedMonthlyEvents = Object.entries(monthlyEventsCount).map(
    ([month, events]) => ({
      month,
      events,
    }),
  );

  // Fetch event type breakdown
  const eventTypeBreakdown = await prisma.event.groupBy({
    by: ["name"],
    where: {
      channelId: { in: channelIds },
    },
    _count: {
      name: true,
    },
    orderBy: {
      _count: {
        name: "desc",
      },
    },
    take: 10,
  });

  // Format the event type breakdown data
  const formattedEventTypeBreakdown = eventTypeBreakdown.map((item) => ({
    eventType: item.name,
    count: item._count.name,
  }));

  return {
    monthlyEvents: formattedMonthlyEvents,
    eventTypeBreakdown: formattedEventTypeBreakdown,
  };
}
