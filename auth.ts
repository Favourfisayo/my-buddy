import NextAuth from "next-auth";
import { authConfig } from "./authConfig";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials); // parsing input fields

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const { fetchUser } = await import("@/lib/data");
          const user = await fetchUser(email); // fetching user
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password); // compare passwords
          if (passwordMatch) {
            return user; // return user session
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    newUser: "/plans",
    error: "auth/error",
    signIn: "/login"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;
      if (!user || !user.email) return false;
      try {
      const { fetchUser } = await import("@/lib/data");
      const { insertUser } = await import("./lib/actions");
      const existingUser = await  fetchUser(user.email);
      if (existingUser) return true;
      await insertUser({
        email: user.email,
        password: null,
        provider: "google",
      });
      return true;
    }catch(error) {
      console.error("Error in signIn callback:", error);
      return false
    }
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
