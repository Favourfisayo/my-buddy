import { GroupedWeek, FlatRow } from "@/data/definitions";

export function groupWeeksWithDays(data: FlatRow[]): GroupedWeek[] {
  const grouped: Record<string, GroupedWeek> = {}

  for (const row of data) {
    if (!grouped[row.week_id]) {
      grouped[row.week_id] = {
        id: row.week_id,
        week_number: row.week_number,
        days: []
      }
    }

    if (row.day_id) {
      grouped[row.week_id].days.push({
        id: row.day_id,
        day_number: row.day_number!,
        topic: row.topic!,
        status: row.status!
      })
    }
  }

  return Object.values(grouped)
}