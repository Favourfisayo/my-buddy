"use server"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import z from "zod"
import sql from "./db"
import { newUser } from "@/data/definitions"
import bcrypt from "bcrypt"
import { useSession } from "@/hooks/useSession"
import { GeneratePlanInput, Plan } from "@/data/definitions"
import { generateLLMOutput } from "@/features/llm/getLLMOutput"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { PlanSchema } from "@/schema/Planschema"
import { fetchUser } from "./data"

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
    
    const newUser = {
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

export const generateAndSavePlan = async (input: GeneratePlanInput) => {
  const rawPlanData = await generateLLMOutput(input)

  const rawPlanDataParsed = PlanSchema.safeParse(rawPlanData)

  if(!rawPlanDataParsed.success) {
    console.error(z.treeifyError(rawPlanDataParsed.error))
    throw new Error("Invalid plan data from LLM output.")
  }

  const planData = rawPlanDataParsed.data 
  const {plan_name, goal, duration_weeks} = planData

  const user = await useSession()
  if(!user || !user.id) return
  const userId = user.id

  try {
    //Batch Inserting plan -> phases -> weeks -> days -> resources
  await sql.begin(async (tx) => {
    const [{id: planId}] = await tx`
    INSERT INTO plans (created_by, name, goal, duration)
    VALUES (${userId}, ${plan_name}, ${goal ?? null}, ${duration_weeks})
    RETURNING id
    `
    const phaseValues = planData.phases.map((p, index) => [p.title, planId, index])
    const phaseResult = await tx`
    INSERT INTO phases (title, plan_id, sort_index)
    VALUES ${sql(phaseValues)}
    RETURNING id
    `
    const phaseIds = phaseResult.map(phase => phase.id)

    const weekValues: any[] = []
    const weekIndexToPhase: any[] = [] // stores [phaseIndex, weekIndex] for later mapping
    planData.phases.forEach((phase, phase_index) => {
      phase.weeks.forEach((week, week_index) => {
        weekValues.push([week.week_number, phaseIds[phase_index]])
        weekIndexToPhase.push([phase_index, week_index])
      })
    })
    
    const weekResult = await tx`
    INSERT INTO weeks (week_number, phase_id)
    VALUES ${sql(weekValues)}
    RETURNING id
    `
    
    const weekIds = weekResult.map(week => week.id)

    const dayValues: any[] = []
    const dayIndexToWeek: any[] = []
    weekIndexToPhase.forEach(([phaseIndex, weekIndex], globalWeekIndex) => {
        const days = planData.phases[phaseIndex].weeks[weekIndex].days
        days.forEach((day, dayIndex) => {
          dayValues.push([day.day, day.topic, weekIds[globalWeekIndex]])
          dayIndexToWeek.push([phaseIndex, weekIndex, dayIndex])
        })
    })

    const dayResult = await tx`
    INSERT INTO days (day_number, topic, week_id)
    VALUES ${sql(dayValues)}
    RETURNING id
    `
    const dayIds = dayResult.map(day => day.id)

    const resourceValues: any[] = []
    dayIndexToWeek.forEach(([phaseIndex, weekIndex, dayIndex], i) => {
      const resources = planData.phases[phaseIndex].weeks[weekIndex].days[dayIndex].resources
      for (const res of resources) {
        resourceValues.push([dayIds[i], res.resource_type, res.resource_material])
      }
    })

    if (resourceValues.length > 0) {
      await tx`
      INSERT INTO resources (day_id, type, url)
      VALUES ${sql(resourceValues)}
      `
    }
})
}catch(error) {
  console.error(`transaction failed: ${error}`)
  throw new Error(`Error creating plan`)
}
  revalidatePath("/plans")
  redirect("/plans")
}

export const insertUser = async(user: newUser) => {
  if(!user || !user.email) return
  const hashedPassword = user.password ? await bcrypt.hash(user.password, 10) : null
  try {
      const result = await sql`
      INSERT INTO users (email, password, provider)
      VALUES (${user.email}, ${hashedPassword}, ${user.provider})
      RETURNING id, email, provider
      `
      return result[0]
  }catch(error) {
      console.error(`Error inserting user: ${error}`)
      throw new Error(`Failed to create user`)
  }
}
