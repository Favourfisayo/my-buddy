import { model } from "@/services/langchain/langchain";
import { PlanSchema } from "@/schema/Planschema";
import { GeneratePlanInput } from "@/data/definitions";
import { draftPrompt } from "@/utils/draftPrompt";
import {traceable} from "langsmith/traceable"
export const generateLLMOutput = traceable(async (input: GeneratePlanInput) => {
    const prompt = draftPrompt(input)
    const structuredModel = model.withStructuredOutput(PlanSchema)

    try {
        const response = await structuredModel.invoke(prompt)
        return response
    }catch(error) {
        console.error(error)
        throw new Error(`Error getting LLM Data: ${error}`)
    }
})