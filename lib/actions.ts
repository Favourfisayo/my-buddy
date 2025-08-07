"use server"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import z from "zod"
import {v4 as uuidv4} from "uuid"
import sql from "./db"
import { newUser } from "@/data/definitions"
import bcrypt from "bcrypt"
import { useSession } from "@/hooks/useSession"
import { GeneratePlanInput, Plan } from "@/data/definitions"
import { generateLLMOutput } from "@/features/llm/getLLMOutput"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { PlanSchema } from "@/features/plan/schema/Planschema"
import { fetchUser } from "./data"
import { savePlanToDb } from "@/features/plan/savePlanToDb"

const statusSchema = z.object({
  status: z.enum(["completed", "in progress", "not started"])
})
export async function authenticate(prevState: string | undefined, formData: FormData){
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type) {
                case 'CredentialsSignin':
                    return "Invalid Credentials"
                default:
                    return "Something went wrong"
            }
        }
        throw error
    }
}
export async function signUpWithCredentials(prevState: string | undefined, formData: FormData) {
  const parsedCredentials = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    redirectTo: z.string().optional()
  }).safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    redirectTo: formData.get("redirectTo")
  })

  if (!parsedCredentials.success) {
    return "Invalid input. Please check your details and try again."
  }

  const {email, password, confirmPassword, redirectTo} = parsedCredentials.data
  if (password !== confirmPassword) return "Passwords do not match. Please try again."
  try {
    const existingUser = await fetchUser(email)
    if (existingUser) return "An account with this email already exists. Please try logging in instead."
    const id = uuidv4()
    const newUser = {
      id,
      email,
      password,
      provider: "credentials"
    }
    const createdUser = await insertUser(newUser)
    if (!createdUser) {
      return "Failed to create account. Please try again."
    }

    redirect("/plans")
  }catch(error) {

  }
}
export async function signInWithGoogle(callbackUrl: string) {
  try {
    await signIn("google", {redirectTo: callbackUrl || "/plans"})
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Authentication error:", error)
      throw error
    }
    throw error
  }
}
export async function handleSignOut() {
  await signOut({ redirectTo: "/" })
}

  export async function updateStatus(
    id: string,
    prevState: { error: string | null },
    formData: FormData
  ) {
    const result = statusSchema.safeParse({
      status: formData.get("status")
    })
  
    if (!result.success) {
      return { error: "Invalid status" }
    }
    const status = result.data.status
    try{
    await sql`UPDATE days 
    SET status = ${status} 
    WHERE id = ${id}`
    } catch (error) {
        console.error(error)
        throw new Error(`Error: ${error}`)
    }
    revalidatePath(`/days/${id}`)
    return { error: null, status: undefined}
  }

  export const savePlan = async (planData: any) => {
    const parsed = PlanSchema.safeParse(planData)
    if (!parsed.success) {
      console.error(z.treeifyError(parsed.error))
      throw new Error("Invalid plan data")
    }
    const user = await useSession()
    if (!user?.id) return
    const userId = user.id
    try {
      await savePlanToDb(parsed.data, userId)
    } catch (error) {
      console.error(`transaction failed: ${error}`)
      throw new Error("Error saving plan to database")
    }
  
    revalidatePath("/plans")
    redirect("/plans")
  }

export const deletePlan = async(plan_id: string) => {
  try {
  await sql`
  DELETE FROM plans WHERE id = ${plan_id}
  `
  }catch(error) {
    console.error(`Error: ${error}`)
    throw new Error(`Error deleting plan: ${error}`)
  }

  revalidatePath("/plans")
}

export const insertUser = async(user: newUser) => {
  if(!user || !user.email || !user.id) return
  const hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : null
  try {
      const result = await sql`
      INSERT INTO users (id, email, password, provider)
      VALUES (${user.id}, ${user.email}, ${hashedPassword}, ${user.provider})
      RETURNING id, email, provider
      `
      return result[0]
  }catch(error) {
      console.error(`Error inserting user: ${error}`)
      throw new Error(`Failed to create user`)
  }
}
