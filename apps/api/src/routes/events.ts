import { Hono } from "hono";

import { Env } from "../env";
import { prisma } from "../lib/db";
import { parsePrismaError } from "../lib/parsePrismaError";
import {
  sendDiscordNotification,
  sendSlackNotification,
} from "../notifications/discord/sendDiscordNotification";
import { EventSchema } from "../validators";

const events = new Hono<{
  Bindings: Env;
}>();

// POST - Create Event
events.post("/", async (c) => {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  // Find user by API key
  const user = await prisma(c.env).user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  try {
    const eventData = EventSchema.parse(await c.req.json());

    // Destructure validated data
    const { channel, name, icon, notify, tags, userId } = eventData;

    // Find the user's project
    const project = await prisma(c.env).project.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!project) {
      return c.json(
        {
          ok: false,
          message:
            "No projects found for this user. Ensure the user has projects created.",
        },
        404,
      );
    }

    // Find the channel by name
    const channelExists = await prisma(c.env).channel.findFirst({
      where: {
        name: channel,
        projectId: project.id,
      },
    });

    if (!channelExists) {
      const availableChannels = await prisma(c.env).channel.findMany({
        where: { projectId: project.id },
        select: { name: true },
      });

      const channelNames = availableChannels.map((ch) => ch.name).join(", ");

      return c.json(
        {
          ok: false,
          message: `No channel found with the provided channel name. You need to add it on the website. These are your available channels: ${channelNames}`,
          availableChannels: availableChannels.map((ch) => ch.name),
        },
        404,
      );
    }

    // Check if the customer exists based on user_id and project_id
    let customer = await prisma(c.env).customer.findUnique({
      where: {
        userId_projectId: {
          userId: userId,
          projectId: project.id,
        },
      },
    });

    // If the customer does not exist, create a new customer
    if (!customer) {
      try {
        customer = await prisma(c.env).customer.create({
          data: {
            projectId: project.id,
            userId: userId,
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
    const savedEvent = await prisma(c.env).event.create({
      data: {
        name: name || "",
        channelId: channelExists.id,
        userId: userId, // userId here is a plain string
        icon: icon || "",
        notify,
        tags: tags || {},
        customerId: customer.id, // Associate the event with the customer
      },
    });

    console.log("New event created:", savedEvent); // Log the new event

    // Update logs metrics for the project
    const metrics = await prisma(c.env).metrics.findUnique({
      where: { projectId: project.id },
    });

    if (metrics) {
      await prisma(c.env).metrics.update({
        where: { id: metrics.id },
        data: {
          logsUsed: { increment: 1 },
        },
      });
      // Fetch the updated metrics and log them
      const updatedMetrics = await prisma(c.env).metrics.findUnique({
        where: { id: metrics.id },
      });
      console.log("Updated metrics:", updatedMetrics);
    } else {
      console.error("Metrics not found for the project");
    }

    // Fetch notification settings for the current user
    const notificationSettings = await prisma(
      c.env,
    ).notificationSetting.findFirst({
      where: { userId: user.id },
    });
    console.log("Notification settings:", notificationSettings);

    if (notificationSettings) {
      const { type, details } = notificationSettings;
      const detailsParsed = details as { webhook: string };

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
    } else {
      console.log("No notification settings found for the user.");
    }

    return c.json(
      { ok: true, message: "Event logged!", event: savedEvent },
      201,
    ); // Return 201 status code
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to log event",
        error: parsePrismaError(error),
      },
      400,
    );
  }
});

export default events;
