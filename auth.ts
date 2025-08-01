import NextAuth from "next-auth"
import { authConfig } from "./authConfig"
import Credentials from "next-auth/providers/credentials"
import {z} from "zod"
import { fetchUser } from "@/lib/data"
import bcrypt from "bcrypt"

export const {signIn, signOut, auth } = NextAuth({
    ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = z.object(
            {
                email: z.string().email(), 
                password: z.string().min(6)
            }).safeParse(credentials) // parsing input fields

            if(parsedCredentials.success) {
                const {email, password} = parsedCredentials.data

                const user = await fetchUser(email) // fetching user
                if(!user) return null
                const passwordMatch = await bcrypt.compare(password, user.password) // comparing parsed password with decrypted password from db
                if (passwordMatch) {
                    return user // returning user session
                }
            }
            console.log("Invalid credentials")
            return null
        }
    })
  ],
})