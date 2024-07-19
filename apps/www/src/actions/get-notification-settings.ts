// actions/get-notification-settings.ts
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getNotificationSettings() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const settings = await prisma.notificationSetting.findFirst({
    where: { userId: user.id },
  });

  return settings;
}
