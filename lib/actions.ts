"use server"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import z from "zod"
import sql from "./db"
import { useSession } from "@/hooks/useSession"
import { GeneratePlanInput, Plan } from "@/data/definitions"
import { generateLLMOutput } from "@/features/getLLMOutput"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

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
const statusSchema = z.object({
    status: z.enum(["completed", "in progress", "not started"])
  })

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
    return { error: null, status: undefined}
    } catch (error) {
        console.error(error)
        throw new Error(`Error: ${error}`)
    }
  }

export const generateAndSavePlan = async (input: GeneratePlanInput) => {
  const planData = await generateLLMOutput(input)

  const user = await useSession()
  console.log(user)
  if(!user) return
  const userId = user?.id
  if (!userId || !planData?.plan_name || !planData?.goal || planData?.duration_weeks == null) {
    throw new Error("Missing required plan data.");
  }

  try {
  const planRow = await sql`
  INSERT INTO plans (created_by, name, goal, duration)
  VALUES (${userId}, ${planData?.plan_name}, ${planData?.goal}, ${planData?.duration_weeks})
  RETURNING id
  `
  const planId = planRow[0].id

  if(!planId) return

  for (const phase of planData.phases) {
    const phaseRow = await sql`
    INSERT INTO phases (title, plan_id)
    VALUES (${phase.title}, ${planId})
    RETURNING id
    `
    const phaseId = phaseRow[0].id

  for (const week of phase.weeks) {
    const weekRow = await sql`
    INSERT INTO weeks (week_number, phase_id)
    VALUES (${week.week_number}, ${phaseId})
    RETURNING id
    `
    const weekId = weekRow[0].id

  for (const day of week.days) {
    const dayRow = await sql`
    INSERT INTO days (day_number, topic, week_id)
    VALUES (${day.day}, ${day.topic}, ${weekId})
    RETURNING id
    `
    const dayId = dayRow[0].id

    for (const resource of day.resources) {
      await sql`
        INSERT INTO resources (day_id, type, url)
        VALUES (${dayId}, ${resource.resource_type}, ${resource.resource_material})
      `
      }
    }
  }
}
}catch(error) {
  console.error(error)
}
  revalidatePath("/plans")
  redirect("/plans")
}