import { z } from "zod";

import { PLANS } from "@projectx/stripe/plans";

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

/**
 * Shared validators used in both the frontend and backend
 */

export const createProjectSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  url: z.string().url("Must be a valid URL").optional(),
});
export type CreateProject = z.infer<typeof createProjectSchema>;

export const renameProjectSchema = z.object({
  projectId: z.string(),
  name: z.string().min(5, "Name must be at least 5 characters"),
});
export type RenameProject = z.infer<typeof renameProjectSchema>;

export const purchaseOrgSchema = z.object({
  orgName: z.string().min(5, "Name must be at least 5 characters"),
  planId: z.string().refine(
    (str) =>
      Object.values(PLANS)
        .map((p) => p.priceId)
        .includes(str),
    "Invalid planId",
  ),
});
export type PurchaseOrg = z.infer<typeof purchaseOrgSchema>;

export const createApiKeySchema = z.object({
  projectId: z.string(),
  name: z.string(),
  expiresAt: z.date().optional(),
});
export type CreateApiKey = z.infer<typeof createApiKeySchema>;

export const MEMBERSHIP = {
  Member: "basic_member",
  Admin: "admin",
} as const;

export const inviteOrgMemberSchema = z.object({
  email: z.string().email(),
  role: z.nativeEnum(MEMBERSHIP),
});
export type InviteOrgMember = z.infer<typeof inviteOrgMemberSchema>;

export const transferToOrgSchema = z.object({
  projectId: z.string(),
  orgId: z.string(),
});
export type TransferToOrg = z.infer<typeof transferToOrgSchema>;
