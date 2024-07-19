// actions/get-event-stats.js
import {
  endOfMonth,
  endOfWeek,
  formatISO,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getEventStats() {
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
    },
  });

  // Extract channel IDs
  const channelIds = channels.map((channel) => channel.id);

  const today = new Date();

  // Dates for the current and previous weeks
  const startOfCurrentWeek = startOfWeek(today);
  const endOfCurrentWeek = endOfWeek(today);
  const startOfLastWeek = startOfWeek(subDays(today, 7));
  const endOfLastWeek = endOfWeek(subDays(today, 7));

  // Fetch events for the current week
  const currentWeekEvents = await prisma.event.count({
    where: {
      channelId: {
        in: channelIds,
      },
      createdAt: {
        gte: formatISO(startOfCurrentWeek),
        lte: formatISO(endOfCurrentWeek),
      },
    },
  });

  // Fetch events for the previous week
  const lastWeekEvents = await prisma.event.count({
    where: {
      channelId: {
        in: channelIds,
      },
      createdAt: {
        gte: formatISO(startOfLastWeek),
        lte: formatISO(endOfLastWeek),
      },
    },
  });

  // Calculate the weekly percentage change
  const weeklyChange =
    lastWeekEvents !== 0
      ? ((currentWeekEvents - lastWeekEvents) / lastWeekEvents) * 100
      : 0;

  // Dates for the current and previous months
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);
  const startOfLastMonth = startOfMonth(subMonths(today, 1));
  const endOfLastMonth = endOfMonth(subMonths(today, 1));

  // Fetch events for the current month
  const currentMonthEvents = await prisma.event.count({
    where: {
      channelId: {
        in: channelIds,
      },
      createdAt: {
        gte: formatISO(startOfCurrentMonth),
        lte: formatISO(endOfCurrentMonth),
      },
    },
  });

  // Fetch events for the previous month
  const lastMonthEvents = await prisma.event.count({
    where: {
      channelId: {
        in: channelIds,
      },
      createdAt: {
        gte: formatISO(startOfLastMonth),
        lte: formatISO(endOfLastMonth),
      },
    },
  });

  // Calculate the monthly percentage change
  const monthlyChange =
    lastMonthEvents !== 0
      ? ((currentMonthEvents - lastMonthEvents) / lastMonthEvents) * 100
      : 0;

  return {
    currentWeekEvents,
    weeklyChange,
    currentMonthEvents,
    monthlyChange,
  };
}
