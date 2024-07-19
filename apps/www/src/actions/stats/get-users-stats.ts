// actions/get-user-stats.js
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserStats() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const today = new Date();
  const startOfToday = startOfDay(today);
  const startOfThisWeek = startOfWeek(today);
  const startOfThisMonth = startOfMonth(today);

  // Fetch total unique users involved in events
  const totalUsersResult = await prisma.event.groupBy({
    by: ["userId"],
  });
  const totalUsers = totalUsersResult.length;

  // Fetch unique users involved in events created today
  const usersTodayResult = await prisma.event.groupBy({
    by: ["userId"],
    where: {
      createdAt: {
        gte: startOfToday,
      },
    },
  });
  const usersToday = usersTodayResult.length;

  // Fetch unique users involved in events created this week
  const usersThisWeekResult = await prisma.event.groupBy({
    by: ["userId"],
    where: {
      createdAt: {
        gte: startOfThisWeek,
      },
    },
  });
  const usersThisWeek = usersThisWeekResult.length;

  // Fetch unique users involved in events created this month
  const usersThisMonthResult = await prisma.event.groupBy({
    by: ["userId"],
    where: {
      createdAt: {
        gte: startOfThisMonth,
      },
    },
  });
  const usersThisMonth = usersThisMonthResult.length;

  return {
    totalUsers,
    usersToday,
    usersThisWeek,
    usersThisMonth,
  };
}
