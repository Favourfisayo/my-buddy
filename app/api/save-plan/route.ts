import { NextResponse } from "next/server"
import { generateLLMOutput } from "@/features/llm/getLLMOutput"
import { GeneratePlanInput } from "@/data/definitions"
import {  savePlan } from "@/lib/actions"
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const input: GeneratePlanInput = body

    const plan = await generateLLMOutput(input)

    await savePlan(plan)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    )
  }
}
