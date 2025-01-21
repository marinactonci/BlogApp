import { NextAuthOptions, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/db";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email!,
            },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
              },
            });
          }

          return true;
        } catch (error) {
          console.error("Error saving user:", error);
          return false;
        }
      }
      return true;
    },
  },
};

export const getAuthSession = () => getServerSession(authConfig);
