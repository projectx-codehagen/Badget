// actions/create-event.js
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { sendDiscordNotification, sendSlackNotification } from "@/lib/utils";

type NotificationDetails = {
  webhook: string;
  name: string;
};

export async function createEvent(data) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  const { channel, name, user_id, icon, notify } = data;

  if (!channel || !name || !user_id || !icon) {
    throw new Error("All fields are required");
  }

  // Ensure the authenticated user's project exists
  const project = await prisma.project.findFirst({
    where: { userId: currentUser.id },
  });

  if (!project) {
    throw new Error("Project not found for the authenticated user");
  }

  // Ensure the channel is unique within the project
  const upsertChannel = await prisma.channel.upsert({
    where: {
      projectId_name: {
        projectId: project.id,
        name: channel,
      },
    },
    update: {},
    create: {
      name: channel,
      projectId: project.id,
    },
  });

  // Check if the customer exists based on user_id and project_id
  let customer = await prisma.customer.findUnique({
    where: {
      userId_projectId: {
        userId: user_id,
        projectId: project.id,
      },
    },
  });

  // If the customer does not exist, create a new customer
  if (!customer) {
    try {
      customer = await prisma.customer.create({
        data: {
          projectId: project.id,
          userId: user_id,
          name: "", // Assuming name and email are optional
          email: "",
          createdAt: new Date(),
        },
      });
      console.log("New customer created:", customer); // Log the new customer
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  } else {
    console.log("Existing customer found:", customer); // Log the existing customer
  }

  // Create the event and associate it with the customer
  try {
    const newEvent = await prisma.event.create({
      data: {
        name,
        userId: user_id, // userId here is a plain string
        icon,
        notify,
        tags: {}, // Provide an empty object or handle this according to your schema
        channelId: upsertChannel.id,
        customerId: customer.id, // Associate the event with the customer
      },
    });

    console.log("New event created:", newEvent); // Log the new event

    // Update logs metrics for the project
    const metrics = await prisma.metrics.findUnique({
      where: { projectId: project.id },
    });

    if (metrics) {
      await prisma.metrics.update({
        where: { id: metrics.id },
        data: {
          logsUsed: { increment: 1 },
        },
      });
      // Fetch the updated metrics and log them
      const updatedMetrics = await prisma.metrics.findUnique({
        where: { id: metrics.id },
      });
      console.log("Updated metrics:", updatedMetrics);
    } else {
      console.error("Metrics not found for the project");
    }

    // Revalidate the path where the event is displayed
    revalidatePath("/dashboard");

    // Fetch notification settings for the current user
    const notificationSettings = await prisma.notificationSetting.findFirst({
      where: { userId: currentUser.id },
    });

    if (notificationSettings) {
      const { type, details } = notificationSettings;
      const detailsParsed = details as NotificationDetails;

      // Send notification based on the provider type
      if (type === "DISCORD" && detailsParsed?.webhook) {
        await sendDiscordNotification(
          detailsParsed.webhook,
          `Event created: ${name}`,
        );
      } else if (type === "SLACK" && detailsParsed?.webhook) {
        await sendSlackNotification(
          detailsParsed.webhook,
          `Event created: ${name}`,
        );
      }
    }

    return { success: true, event: newEvent };
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
