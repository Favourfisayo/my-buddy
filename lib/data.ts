import sql from "@/lib/db";
import { Plan, Phase, FlatRow, Resource } from "@/data/definitions";
import { auth } from "@/auth";

export const fetchUserPlans = async () => {
    try{
        const session = await auth()
        const userEmail = session?.user?.email
        if(!userEmail) return
        const plans = await sql<Plan[]> `
        SELECT plans.* 
        FROM plans
        JOIN users ON users.email = plans.created_by
        WHERE users.email = ${userEmail}
        `
        const plansUpdated = plans.map((plan) => {
            return {
                ...plan,
                created_at: new Date(plan.created_at).toLocaleDateString("en-US")
            }
        })
        return plansUpdated

    }catch(error) {
        console.error(error)
        throw new Error(`Error: ${error}`)
    }

}
export const fetchPhasesWithStatus = async (plan_id: string) => {
    try {
        const result = await sql<Phase[]>`
        SELECT 
            phases.id,
            phases.title,
            phases.plan_id,
            COUNT(DISTINCT weeks.id) AS week_count,
            
            CASE
                WHEN bool_and(days.status = 'completed') THEN 'completed'
                WHEN bool_or(days.status IN ('in progress', 'completed')) THEN 'in progress'
                ELSE 'not started'
            END AS status

            FROM phases
            LEFT JOIN weeks ON weeks.phase_id = phases.id
            LEFT JOIN days ON days.week_id = weeks.id
            WHERE phases.plan_id = ${plan_id}
            GROUP BY phases.id, phases.title, phases.plan_id, phases.sort_index
            ORDER BY phases.sort_index ASC
            `
        return result
    }catch(error) {
        console.error(`Error: ${error}`)
        throw new Error(`Error fetching phases status: ${error}`)
    }
}

export const fetchPlanProgressData = async (plan_id: string) => {
  try {
    const result = await sql<{
      completed_days: number;
      total_days: number;
    }[]>`
      SELECT
        COUNT(DISTINCT days.id) AS total_days,
        COUNT(CASE WHEN days.status = 'completed' THEN 1 END) AS completed_days
      FROM phases
      INNER JOIN weeks ON weeks.phase_id = phases.id
      INNER JOIN days ON days.week_id = weeks.id
      WHERE phases.plan_id = ${plan_id}
    `;

    return result[0];
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};


export const fetchPlanById = async (plan_id: string) => {
    try {
        const plan = await sql<Plan[]>`
        SELECT * FROM plans
        WHERE id = ${plan_id}
        `
        return plan[0]
    } catch(error) {
        console.error(error)
        throw new Error(`Error: ${error}`)
    }
}

export const fetchWeeksAndDaysByPhaseId = async (phase_id: string): Promise<FlatRow[]> => {
    try {
    const result = await sql<FlatRow[]>`
    SELECT 
    weeks.id as week_id,
    weeks.week_number,
    days.id as day_id,
    days.day_number,
    days.topic,
    days.status,
    days.week_id
    FROM weeks
    LEFT JOIN days ON days.week_id = weeks.id
    WHERE weeks.phase_id = ${phase_id}
    ORDER BY weeks.week_number ASC, days.day_number ASC
    `
    return result 
    }catch (error) {
        console.error("Error: ", error)
        return []
    }
}

export const fetchPhaseById = async (phase_id: string) => {
    try {
        const phase = await sql<Phase[]>`
            SELECT * FROM phases
            WHERE id = ${phase_id}
        `
        return phase[0]
    }catch(error) {
        console.error(error)
        throw new Error(`Error: ${error}`)
    }
}

export const fetchResourcesByDayId = async (day_id: string): Promise<Resource[]> => {
    try {
        const resources = await sql<Resource[]>`
        SELECT * from resources
        WHERE day_id = ${day_id}
        `
        return resources
    } catch(error) {
        console.error("Error: ", error)
        throw new Error(`Error: ${error}`)
        return []
    }
}