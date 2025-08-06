import { fetchPlanProgressData, fetchPhasesWithStatus } from "@/lib/data"
export const getPlanAndPhaseData = async (plan_id: string) => {
    const phases = await fetchPhasesWithStatus(plan_id)
    const progressData = await fetchPlanProgressData(plan_id)
    const totalPhases = phases.length
    const totalWeeks = progressData.total_weeks
    const totalDays = totalWeeks * 7
    const progress = totalDays > 0 ? (progressData.completed_days / totalDays) * 100 : 0
    const progressRounded = Math.round(progress)
  
    const weeksData = `${totalWeeks} ${totalWeeks === 1 ? "Week" : "Weeks"}`
    const phasesData = `${totalPhases} ${totalPhases === 1 ? "Phase" : "Phases"}`
    const totalMonths = Math.round(totalWeeks / 4)
    const monthsData = `${totalMonths} ${totalMonths === 1 ? "Month" : "Months"}`

    return {
        phases,
        progressRounded,
        weeksData,
        phasesData,
        monthsData
    }
}