import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const userAuthSchema = z.object({
  email: z.string().email(),
});

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  mode: z.enum(["light", "dark"]).default("dark"),
});

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});
