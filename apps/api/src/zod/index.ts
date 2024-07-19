import { z } from "zod";
import { extendZodWithOpenApi, createDocument } from "zod-openapi";
import * as yaml from "yaml";

// Extend Zod with OpenAPI functionality
extendZodWithOpenApi(z);

// Define the Event Schema with OpenAPI extensions
export const EventSchema = z.object({
  id: z.number().openapi({
    description: "The unique identifier of the event.",
    example: 101,
  }),
  name: z.string().optional().openapi({
    description: "The user's name.",
    example: "John Doe",
  }),
  channel: z.string().openapi({
    description: "The channel name associated with the event.",
    example: "Main Channel",
  }),
  event: z.string().openapi({
    description: "The name of the event.",
    example: "Annual Meetup",
  }),
  userId: z.number().openapi({
    description: "The ID of the user who created the event.",
    example: 501,
  }),
  icon: z.string().optional().openapi({
    description: "An optional icon for the event.",
    example: "icon.png",
  }),
  notify: z.boolean().openapi({
    description: "Flag to notify users about the event.",
    example: true,
  }),
  tags: z
    .record(z.string())
    .optional()
    .openapi({
      description: "Optional tags for additional event metadata.",
      example: { tag1: "Networking", tag2: "Tech" },
    }),
  createdAt: z.date().openapi({
    description: "The creation date of the event.",
  }),
});

// Define the User Schema with OpenAPI extensions
export const UserSchema = z.object({
  id: z.number().openapi({
    description: "The unique identifier of the user.",
    example: 501,
  }),
  name: z.string().optional().openapi({
    description: "The user's name.",
    example: "John Doe",
  }),
  email: z.string().email().openapi({
    description: "The user's email address.",
    example: "john.doe@example.com",
  }),
  plan: z.string().openapi({
    description: "The subscription plan of the user.",
    example: "Pro",
  }),
  events: z.array(EventSchema).openapi({
    description: "A list of events associated with the user.",
  }),
  createdAt: z.date().openapi({
    description: "The creation date of the user's account.",
  }),
});
