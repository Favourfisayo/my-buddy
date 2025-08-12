import { model } from "@/services/langchain/langchain";
import {  PlanSchema } from "@/features/plan/schema/Planschema";
import { GeneratePlanInput } from "@/data/definitions";
import { draftPrompt } from "@/utils/draftPrompt";
import {traceable} from "langsmith/traceable"
import { fixBrokenLinks } from "./fixBrokenLinks";


export const generateLLMOutput = traceable(async (input: GeneratePlanInput) => {
    const prompt = draftPrompt(input)
    const structuredModel = model.withStructuredOutput(PlanSchema)

    try {
        const initialPlan = await structuredModel.invoke(prompt)
        const finalPlan = await fixBrokenLinks(initialPlan)
        return finalPlan
    }catch(error) {
        console.error(error)
        throw new Error(`Error getting LLM Data: ${error}`)
    }
})