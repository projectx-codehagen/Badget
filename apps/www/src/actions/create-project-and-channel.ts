// actions/create-project-and-channel.js
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function createProjectAndChannel(projectName) {
  const user = await getCurrentUser();
  const userId = user?.id;

  if (!userId) {
    console.error("No user is currently logged in.");
    return { success: false, error: "User not authenticated" };
  }

  try {
    // Create the new project
    const newProject = await prisma.project.create({
      data: {
        name: projectName,
        userId: userId,
      },
    });
    console.log(
      `Created project with ID: ${newProject.id} for user ID: ${userId}.`,
    );

    // Create a new channel with a default name within the new project
    const newChannel = await prisma.channel.create({
      data: {
        name: "new-channel-name",
        projectId: newProject.id,
      },
    });
    console.log(
      `Created channel with ID: ${newChannel.id} for project ID: ${newProject.id}.`,
    );

    // Create a metrics record for the new project
    const newMetrics = await prisma.metrics.create({
      data: {
        projectId: newProject.id,
        logsUsed: 0,
        logsLimit: 1000,
        channelsUsed: 1,
        channelsLimit: 3,
        seatsUsed: 1,
        projectsUsed: 1,
      },
    });
    console.log(
      `Created metrics with ID: ${newMetrics.id} for project ID: ${newProject.id}.`,
    );

    return { success: true, project: newProject, channel: newChannel };
  } catch (error) {
    console.error(
      `Error creating project and channel for user ID: ${userId}`,
      error,
    );
    return { success: false, error: error.message };
  }
}
