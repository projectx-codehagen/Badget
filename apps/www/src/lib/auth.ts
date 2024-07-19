import type { NextAuthOptions } from "next-auth";
import sendOnboardingEmail from "@/actions/send-onboarding-email";
import { siteConfig } from "@/config/site";
import MagicLinkEmail from "@/emails/magic-link-email";
import { env } from "@/env";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import { resend } from "./email";
import { prisma } from "./db";

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
            from: "Propwrite App <onboarding@resend.dev>",
            to:
              process.env.NODE_ENV === "development"
                ? "delivered@resend.dev"
                : identifier,
            subject: authSubject,
            react: MagicLinkEmail({
              firstName: user?.name!,
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
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

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
