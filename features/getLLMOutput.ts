import { model } from "@/langchain/langchain";
import { PlanSchema } from "@/schema/Planschema";
import { GeneratePlanInput } from "@/data/definitions";

export const generateLLMOutput = async (input: GeneratePlanInput) => {
    const {tech, duration, goal} = input
    const prompt = `
    You are a learning assistant. Create a personalized learning plan based on the user input below. Use the schema you were trained on.
    Also make sure the resource_material is a url to the resource itself. 
    Tech: ${tech}
    Duration: ${duration}
    Goal: ${goal}
    `
    const structuredModel = model.withStructuredOutput(PlanSchema)

    try {
        const response = await structuredModel.invoke(prompt)
        return response
    }catch(error) {
        console.error(error)
    }
}