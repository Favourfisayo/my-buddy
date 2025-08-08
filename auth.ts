import NextAuth from "next-auth";
import { authConfig } from "./authConfig";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.email(),
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
  ],
  pages: {
    newUser: "/plans",
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});