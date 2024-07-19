// users.ts
import { Hono } from "hono";

import { Env } from "../env";
import { prisma } from "../lib/db";
import { generateApiKey } from "../lib/generateApiKey";
import { parsePrismaError } from "../lib/parsePrismaError";
import { UserSchema } from "../zod";

const users = new Hono<{
  Bindings: Env;
}>();

// POST - Create User
users.post("/", async (c) => {
  const inputData = UserSchema.omit({
    id: true,
    events: true,
  }).parse(await c.req.json());
  const { email, name, plan } = inputData as Partial<User>;

  if (!email) {
    return c.json({ ok: false, message: "Missing required field: email" }, 400);
  }

  const apiKey = generateApiKey();

  try {
    const user = await prisma(c.env).user.upsert({
      where: { email },
      update: { name, plan },
      create: { email, name: name || "", plan: plan || "", apiKey },
    });
    return c.json({ ok: true, message: "User created", user });
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to create or update user",
        error: parsePrismaError(error),
      },
      500,
    );
  }
});

// GET - Retrieve user with specific API key
users.get("/", async (c) => {
  const apiKey = c.req.header("x-api-key");

  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  try {
    const user = await prisma(c.env).user.findUnique({
      where: { apiKey },
    });

    if (!user) {
      return c.json({ ok: false, message: "Invalid API key" }, 401);
    }

    return c.json({ ok: true, user });
  } catch (error: any) {
    return c.json(
      {
        ok: false,
        message: "Failed to retrieve user",
        error: error.message || "Unknown error",
      },
      500,
    );
  }
});

export default users;
