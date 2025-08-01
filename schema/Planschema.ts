import z from "zod";

export const PlanSchema = z.object({
  plan_name: z.string(),
  goal: z.string().optional(),
  duration_weeks: z.number(),
  phases: z.array(
    z.object({
      title: z.string(),
      weeks: z.array(
        z.object({
          week_number: z.number(),
          days: z.array(
            z.object({
              day: z.number(),
              topic: z.string(),
              resources: z.array(
                z.object({
                  resource_type: z.string(),
                  resource_material: z.string()
                })
              )
            })
          )
        })
      ),
      project: z.object({
        title: z.string(),
        description: z.string()
      })
    })
  )
})

export type PlanOutput = z.infer<typeof PlanSchema>