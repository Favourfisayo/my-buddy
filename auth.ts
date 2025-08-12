import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  pages: {
    newUser: "/plans",
    signIn: "/login"
  },
  callbacks: {
    authorized({request, auth}) {
        const { pathname } = request.nextUrl
        if (pathname === "/plans") return !!auth
        return true
        },
  },
});