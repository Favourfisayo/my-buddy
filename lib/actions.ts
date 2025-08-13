"use server"
import { signOut } from "@/auth"
import z from "zod"
import sql from "./db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { PlanOutput, PlanSchema } from "@/features/plan/schema/Planschema"
import { savePlanToDb } from "@/features/plan/savePlanToDb"

const statusSchema = z.object({
  status: z.enum(["completed", "in progress", "not started"])
})
export async function handleSignOut() {
  await signOut()
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

  export async function savePlan (planData: PlanOutput){
    const parsed = PlanSchema.safeParse(planData)
    if (!parsed.success) {
      console.error(z.treeifyError(parsed.error))
      throw new Error("Invalid plan data")
    }
    const session = await auth()
    if (!session?.user?.email) return
    const userEmail = session.user.email
    try {
      await savePlanToDb(parsed.data, userEmail)
    } catch (error) {
      console.error(`transaction failed: ${error}`)
      throw new Error("Error saving plan to database")
    }
  
    revalidatePath("/plans")
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
