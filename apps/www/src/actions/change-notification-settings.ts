"use server";

import { NotificationType } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function updateNotificationSettings(data: {
  name: string;
  provider: string;
  webhook: string;
}) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }
  try {
    // Find the existing notification setting based on userId
    const existingSetting = await prisma.notificationSetting.findFirst({
      where: { userId },
    });

    let updatedSettings;

    const providerType = data.provider.toUpperCase() as NotificationType;

    if (existingSetting) {
      // Update the existing setting
      updatedSettings = await prisma.notificationSetting.update({
        where: { id: existingSetting.id },
        data: {
          type: providerType,
          details: {
            webhook: data.webhook,
            name: data.name,
          },
        },
      });
    } else {
      // Create a new setting if it doesn't exist
      updatedSettings = await prisma.notificationSetting.create({
        data: {
          userId,
          type: providerType,
          details: {
            webhook: data.webhook,
            name: data.name,
          },
        },
      });
    }

    return { success: true, settings: updatedSettings };
  } catch (error) {
    console.error("Error updating notification settings:", error);
    return { success: false, error: error.message };
  }
}
