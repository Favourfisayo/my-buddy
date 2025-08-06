import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {wrapSDK} from "langsmith/wrappers"
export const model = wrapSDK(new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
}))