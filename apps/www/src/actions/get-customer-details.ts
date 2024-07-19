// actions/get-customer-details.ts
"use server";

import { subDays } from "date-fns";

import { prisma } from "@/lib/db";

export async function getCustomerDetails(customerId: string) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        events: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            channel: true,
          },
        },
      },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const now = new Date();
    const fourteenDaysAgo = subDays(now, 14);

    // Calculate events in the last 14 days
    const recentEvents = customer.events.filter(
      (event) => new Date(event.createdAt) >= fourteenDaysAgo,
    );

    const eventCountLast14Days = recentEvents.length;

    let userStatus = "Idle User 😴";
    if (eventCountLast14Days > 10) {
      userStatus = "Power User 🔥";
    } else if (eventCountLast14Days >= 1) {
      userStatus = "Engaged User 👍";
    }

    // Calculate the first and last seen dates and most used feature
    const firstSeen = customer.events[0]?.createdAt || null;
    const lastSeen =
      customer.events[customer.events.length - 1]?.createdAt || null;

    // Calculate the most used feature
    const featureUsage = customer.events.reduce((acc, event) => {
      acc[event.name] = (acc[event.name] || 0) + 1;
      return acc;
    }, {});
    const mostUsedFeature = Object.keys(featureUsage).reduce(
      (a, b) => (featureUsage[a] > featureUsage[b] ? a : b),
      "",
    );

    return {
      ...customer,
      firstSeen,
      lastSeen,
      mostUsedFeature,
      userStatus,
    };
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
}
