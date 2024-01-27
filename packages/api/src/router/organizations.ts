import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { inviteOrgMemberSchema } from "@projectx/validators";

import {
  createTRPCRouter,
  protectedAdminProcedure,
  protectedOrgProcedure,
} from "../trpc";

export const organizationsRouter = createTRPCRouter({
  listMembers: protectedOrgProcedure.query(async (opts) => {
    const { orgId } = opts.ctx.auth;

    const members =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: orgId,
      });

    return members.map((member) => ({
      id: member.id,
      email: member.publicUserData?.identifier ?? "",
      role: member.role,
      joinedAt: member.createdAt,
      avatarUrl: member.publicUserData?.imageUrl,
      name: [
        member.publicUserData?.firstName,
        member.publicUserData?.lastName,
      ].join(" "),
    }));
  }),

  deleteMember: protectedAdminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async (opts) => {
      const { orgId } = opts.ctx.auth;

      try {
        const member =
          await clerkClient.organizations.deleteOrganizationMembership({
            organizationId: orgId,
            userId: opts.input.userId,
          });

        return { memberName: member.publicUserData?.firstName };
      } catch (e) {
        console.log("Error deleting member", e);
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
    }),

  inviteMember: protectedAdminProcedure
    .input(inviteOrgMemberSchema)
    .mutation(async (opts) => {
      const { orgId } = opts.ctx.auth;

      const { email } = opts.input;
      const users = await clerkClient.users.getUserList({
        emailAddress: [email],
      });
      const user = users[0];

      if (users.length === 0 || !user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      if (users.length > 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Multiple users found with that email address",
        });
      }

      const member =
        await clerkClient.organizations.createOrganizationMembership({
          organizationId: orgId,
          userId: user.id,
          role: opts.input.role,
        });

      const { firstName, lastName } = member.publicUserData ?? {};
      return { name: [firstName, lastName].join(" ") };
    }),

  deleteOrganization: protectedAdminProcedure.mutation(async (opts) => {
    const { orgId } = opts.ctx.auth;

    await clerkClient.organizations.deleteOrganization(orgId);
  }),
});
