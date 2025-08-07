import { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
      newUser: "/plans",
      signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnPlanPages = nextUrl.pathname.startsWith("/plans");
          
            if (isOnPlanPages) {
              return isLoggedIn;
            } else if (isLoggedIn) {
              return Response.redirect(new URL("/plans", nextUrl));
            } else {
              return true;
            }
          }
    },
    providers: []
} satisfies NextAuthConfig
