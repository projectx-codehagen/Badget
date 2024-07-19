import { Hono } from "hono";

import { Env } from "../env";
import { prisma } from "../lib/db";

const projects = new Hono<{
  Bindings: Env;
}>();

projects.post("/", async (c) => {
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

  // Parse and validate the request body
  let result;
  try {
    result = await c.req.json();
  } catch (error) {
    return c.json({ ok: false, message: "Invalid JSON body" }, 400);
  }

  if (!result || typeof result.name !== "string") {
    return c.json(
      {
        ok: false,
        message: "Invalid project data",
        errors: ["'name' is required and should be a string"],
      },
      400,
    );
  }

  const { name } = result;

  const projectExists = await prisma(c.env).project.findFirst({
    where: {
      name,
      userId: user.id,
    },
  });

  if (projectExists) {
    return c.json(
      { ok: false, message: "Project with this name already exists" },
      409,
    );
  }

  const project = await prisma(c.env).project.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return c.json({ ok: true, message: "Project created", project });
});

projects.get("/", async (c) => {
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
    where: {
      userId: user.id,
    },
  });

  if (!projects || projects.length === 0) {
    return c.json({ ok: false, message: "No projects found" }, 404);
  }

  return c.json({ ok: true, projects });
});

export default projects;
