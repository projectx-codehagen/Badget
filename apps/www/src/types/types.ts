// types.ts
import { z } from "zod";

// Define TypeScript types
export type Event = {
  id: string;
  name: string;
  channelId: string;
  userId: string;
  icon: string;
  notify: boolean;
  tags: Record<string, unknown>;
  createdAt: string;
};

export type ChannelDetails = {
  id: string;
  name: string;
  projectId: string;
  createdAt: string;
  project: {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
  };
  events: Event[];
};

// Define Zod schemas
export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  channelId: z.string(),
  userId: z.string(),
  icon: z.string(),
  notify: z.boolean(),
  tags: z.record(z.unknown()),
  createdAt: z.string(),
});

export const channelDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  project: z.object({
    id: z.string(),
    name: z.string(),
    userId: z.string(),
    createdAt: z.string(),
  }),
  events: z.array(eventSchema),
});
