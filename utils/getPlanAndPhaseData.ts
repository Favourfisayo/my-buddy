import { fetchPlanProgressData, fetchPhasesWithStatus } from "@/lib/data"
export const getPlanAndPhaseData = async (plan_id: string) => {
    const phases = await fetchPhasesWithStatus(plan_id)
    const progressData = await fetchPlanProgressData(plan_id)
    const totalPhases = phases.length
    const progress = progressData.total_days > 0 ? (progressData.completed_days / progressData.total_days) * 100 : 0
    const totalWeeks = Math.round(progressData.total_days / 7)
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