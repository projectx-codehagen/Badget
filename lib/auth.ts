import sendOnboardingEmail from "@/actions/send-onboarding-email";
import MagicLinkEmail from "@/emails/magic-link-email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db";

import { resend } from "./email";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            name: true,
            emailVerified: true,
          },
        });

        const userVerified = user?.emailVerified ? true : false;
        const authSubject = userVerified
          ? `Sign-in link for ${siteConfig.name}`
          : "Activate your account";

        try {
          const result = await resend.emails.send({
            from: "Projectx App <onboarding@resend.dev>",
            to:
              process.env.NODE_ENV === "development"
                ? (process.env.TEST_EMAIL_ADDRESS as string)
                : identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name as string,
              actionUrl: url,
              mailType: userVerified ? "login" : "register",
              siteName: siteConfig.name,
            }),
            // Set this to prevent Gmail from threading emails.
            // More info: https://resend.com/changelog/custom-email-headers
            headers: {
              "X-Entity-Ref-ID": new Date().getTime() + "",
            },
          });

          // console.log(result)
        } catch (error) {
          throw new Error("Failed to send verification email.");
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      let dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
        include: { Workspaces: true },
      });

      // Check if the user exists and has no workspaces
      if (dbUser && dbUser.Workspaces.length === 0) {
        console.log("Creating new workspace for existing user");

        const newWorkspace = await prisma.workspace.create({
          data: {
            name: "Workspace 1",
            userId: dbUser.id,
          },
        });

        console.log("New workspace created:", newWorkspace);
      }

      if (dbUser && !dbUser.onboardingEmailSent) {
        // Ensure email and name are not null before sending
        if (dbUser.email && dbUser.name) {
          await sendOnboardingEmail(dbUser.email, dbUser.name);

          await prisma.user.update({
            where: { email: dbUser.email },
            data: { onboardingEmailSent: true },
          });

          console.log(`Onboarding email sent to ${dbUser.email}`);
        } else {
          console.log(
            `User email or name is null for user with email: ${token.email}`,
          );
        }
      }

      if (!dbUser) {
        if (user) {
          token.id = user.id!;
          token.email = user.email!;
          token.name = user.name!;
          // Add other necessary token assignments
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  // debug: process.env.NODE_ENV !== "production"
};
