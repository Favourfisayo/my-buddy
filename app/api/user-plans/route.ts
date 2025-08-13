import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { fetchUserPlans } from "@/lib/data"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const plans = await fetchUserPlans()
    return NextResponse.json(plans)
    
  } catch (error) {
    console.error("Error fetching user plans:", error)
    return NextResponse.json(
      { error: "Failed to fetch plans" }, 
      { status: 500 }
    )
  }
}