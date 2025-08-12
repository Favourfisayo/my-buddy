import {ChatPromptTemplate} from "@langchain/core/prompts"
import {StringOutputParser} from "@langchain/core/output_parsers"
import { model } from "@/services/langchain/langchain";
export const getReplacementUrl = async (topic: string, resourceType: string): Promise<string> => {
    try {
    const prompt = ChatPromptTemplate.fromTemplate(`
Find a currently existing and working ${resourceType} resource for learning "${topic}".

Rules:
1. Prefer reputable sources (for videos: freeCodeCamp, Fireship, Traversy Media, Web Dev Simplified).
2. If suggesting a YouTube video, ensure the channel exists and the link is a valid watch URL.
3. Only suggest resources that are free to access.
4. Do NOT make up links — return only URLs you are confident exist.
5. Output ONLY the URL, with no extra text or explanation.
`)
    const chain = prompt.pipe(model).pipe(new StringOutputParser())
    const url = await chain.invoke({})
    return url.trim()
    }catch(error) {
        console.error(error)
        return ""
    }
}