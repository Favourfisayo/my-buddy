import { validateUrl } from "./validateUrl";
import { getReplacementUrl } from "./getReplacementUrl";
import { PlanOutput } from "../plan/schema/Planschema";

export const fixBrokenLinks = async (plan: PlanOutput): Promise<PlanOutput> => {
        for (const phase of plan.phases) {
            for (const week of phase.weeks) {
                for (const day of week.days) {
                    const checks = day.resources.map(async (resource) => {
                        const isValid = await validateUrl(resource.resource_material);
                          if (!isValid) {
                            const newURL = await getReplacementUrl(day.topic, resource.resource_type);
                            resource.resource_material = newURL;
                        }
                    })
                    await Promise.all(checks)
                }
            }
        }
        return plan
}