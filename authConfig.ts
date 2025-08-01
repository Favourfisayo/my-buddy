import { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user
            const isOnPlanPages = nextUrl.pathname.startsWith("/plans")
            if(isOnPlanPages) {
                if(isLoggedIn) {
                    return true
                } else {
                    return false
                }
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/plans", nextUrl))
            } else {
                return true
            }
        },

        async session({ session, token }) {
            if (session.user && token.sub) {
              session.user.id = token.sub
            }
            return session
          },
    },
    providers: []
} satisfies NextAuthConfig