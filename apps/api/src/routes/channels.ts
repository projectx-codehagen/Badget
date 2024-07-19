import { Hono } from "hono";
import { Env } from "../env";
import { prisma } from "../lib/db";

const channels = new Hono<{
  Bindings: Env;
}>();

channels.post("/", async (c) => {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  const user = await prisma(c.env).user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  const { project, name } = await c.req.json();

  if (!project) {
    return c.json({ ok: false, message: "Project name is required" }, 400);
  }

  const projectExists = await prisma(c.env).project.findFirst({
    where: {
      name: project,
      userId: user.id,
    },
  });

  if (!projectExists) {
    return c.json(
      {
        ok: false,
        message: "Project not found or does not belong to the user",
      },
      404,
    );
  }

  const channelExists = await prisma(c.env).channel.findFirst({
    where: {
      name,
      projectId: projectExists.id,
    },
  });

  if (channelExists) {
    return c.json(
      {
        ok: false,
        message: "Channel with this name already exists in the project",
      },
      409,
    );
  }

  const channel = await prisma(c.env).channel.create({
    data: {
      name,
      projectId: projectExists.id,
    },
  });

  return c.json({ ok: true, message: "Channel created", channel });
});

channels.get("/", async (c) => {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  const user = await prisma(c.env).user.findUnique({
    where: { apiKey },
  });

  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  const projects = await prisma(c.env).project.findMany({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!projects || projects.length === 0) {
    return c.json(
      { ok: false, message: "No projects found for the user" },
      404,
    );
  }

  const projectIds = projects.map((project) => project.id);
  const channels = await prisma(c.env).channel.findMany({
    where: { projectId: { in: projectIds } },
  });

  if (!channels || channels.length === 0) {
    return c.json(
      { ok: false, message: "No channels found for the user's projects" },
      404,
    );
  }

  return c.json({ ok: true, channels });
});

export default channels;
