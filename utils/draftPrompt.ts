import { GeneratePlanInput } from "@/data/definitions";

export const draftPrompt = (input: GeneratePlanInput) => {
    const {tech, duration, goal} = input
    const prompt = `
You are a smart learning assistant that generates personalized, structured learning plans.

Please return a valid JSON object that matches the schema you were trained on. The structure must follow exactly this format:

- The learning plan must:
  - Match the user's tech, duration, and goal
  - Be broken into PHASES → WEEKS (7 days each) → DAYS → RESOURCES
  - Include 1 or more resources (with working URLs) per day

Here is the user input:
- Tech/topic: ${tech}
- Duration: ${duration}
- Goal: ${goal}

Make sure the final JSON includes:
- plan_name
- goal
- duration_weeks
- phases (with phase_duration, title, weeks, project)
- Each week has 7 days
- Each day has a topic and a list of resources
- Each resource has a resource_type and a working resource_material (URL)

Respond **only** with the JSON.
`
return prompt

}