import { generateLLMOutput } from "@/features/llm/getLLMOutput"
import { NextResponse } from "next/server"
export async function POST(req: Request) {
    const input = await req.json()
    const plan = await generateLLMOutput(input)
    return NextResponse.json(plan)
  }
  