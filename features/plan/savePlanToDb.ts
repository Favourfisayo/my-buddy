import z from "zod"
import sql from "@/lib/db"
import { PlanSchema } from "./schema/Planschema"
type ParsedDataPlan = z.infer<typeof PlanSchema>


export const savePlanToDb = async (plan: ParsedDataPlan, userId: string) => {
    const { plan_name, goal, duration_weeks, phases } = plan
    await sql.begin(async (tx) => {
        const [{ id: planId }] = await tx`
          INSERT INTO plans (created_by, name, goal, duration)
          VALUES (${userId}, ${plan_name}, ${goal ?? null}, ${duration_weeks})
          RETURNING id
        `
  
        const phaseValues = phases.map((p, index) => [p.title, planId, index])
        const phaseResult = await tx`
          INSERT INTO phases (title, plan_id, sort_index)
          VALUES ${sql(phaseValues)}
          RETURNING id
        `
        const phaseIds = phaseResult.map(phase => phase.id)
  
        const weekValues: any[] = []
        const weekIndexToPhase: any[] = []
  
        phases.forEach((phase, phase_index) => {
          phase.weeks.forEach((week, week_index) => {
            weekValues.push([week.week_number, phaseIds[phase_index]])
            weekIndexToPhase.push([phase_index, week_index])
          })
        })
  
        const weekResult = await tx`
          INSERT INTO weeks (week_number, phase_id)
          VALUES ${sql(weekValues)}
          RETURNING id
        `
        const weekIds = weekResult.map(week => week.id)
  
        const dayValues: any[] = []
        const dayIndexToWeek: any[] = []
  
        weekIndexToPhase.forEach(([phaseIndex, weekIndex], globalWeekIndex) => {
          const days = phases[phaseIndex].weeks[weekIndex].days
          days.forEach((day, dayIndex) => {
            dayValues.push([day.day, day.topic, weekIds[globalWeekIndex]])
            dayIndexToWeek.push([phaseIndex, weekIndex, dayIndex])
          })
        })
  
        const dayResult = await tx`
          INSERT INTO days (day_number, topic, week_id)
          VALUES ${sql(dayValues)}
          RETURNING id
        `
        const dayIds = dayResult.map(day => day.id)
  
        const resourceValues: any[] = []
  
        dayIndexToWeek.forEach(([phaseIndex, weekIndex, dayIndex], i) => {
          const resources = phases[phaseIndex].weeks[weekIndex].days[dayIndex].resources
          for (const res of resources) {
            resourceValues.push([dayIds[i], res.resource_type, res.resource_material])
          }
        })
  
        if (resourceValues.length > 0) {
          await tx`
            INSERT INTO resources (day_id, type, url)
            VALUES ${sql(resourceValues)}
          `
        }
      })
}