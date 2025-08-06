import { authConfig } from "./authConfig";
import NextAuth from "next-auth";

export default NextAuth(authConfig).auth

export const config = {
    matcher: ["/plans"]
}
