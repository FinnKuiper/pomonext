import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [GitHub, Google],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return {
        ...session,
      };
    },
  },
} satisfies NextAuthConfig;
