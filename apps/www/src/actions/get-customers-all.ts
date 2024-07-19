import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getAllCustomersForUser() {
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

  // Fetch customers associated with the user's projects
  const customers = await prisma.customer.findMany({
    where: {
      projectId: {
        in: projectIds,
      },
    },
  });

  return customers;
}
