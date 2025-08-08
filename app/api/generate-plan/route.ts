import { NextResponse } from "next/server"
import { generateLLMOutput } from "@/features/llm/getLLMOutput"
import { GeneratePlanInput } from "@/data/definitions"
export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    const input: GeneratePlanInput = body

    const plan = await generateLLMOutput(input)

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    )
  }
}
