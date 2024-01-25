// actions/get-user-workspaces.js
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getUserWorkspaces() {
  const user = await getCurrentUser();
  const userId = user?.id;

  //   console.log(`Request received to get workspaces for User ID: ${userId}`);

  try {
    const workspaceData = await prisma.workspace.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        // Include other fields as needed
      },
    });

    // Transform the workspace data
    const transformedWorkspaces = workspaceData.map((ws) => ({
      workspaceName: ws.name,
      email: user?.name,
      icon: "vercel",
      name: user?.name,
    }));

    // console.log(`Workspaces retrieved successfully for user ID: ${userId}`);
    return { success: true, workspaces: transformedWorkspaces };
  } catch (error) {
    console.error(`Error retrieving workspaces for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}