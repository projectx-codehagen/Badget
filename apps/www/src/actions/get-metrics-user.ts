import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getMetricsForUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const metrics = await prisma.metrics.findFirst({
    where: {
      project: {
        userId: user.id,
      },
    },
  });

  return metrics;
}
