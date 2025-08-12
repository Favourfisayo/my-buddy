
export type Plan = {
  id: string,
  created_at: string,
  name: string,
  goal: string,
  duration: number
}

export type Phase = {
  id: string,
  title: string,
  plan_id: string,
  week_count: number,
  status: "completed" | "in progress" | "not started"
}

export type FlatRow = {
  week_id: string
  week_number: number
  day_id: string | null
  day_number: number | null
  topic: string | null
  status: string | null
}

type Day = {
  id: string
  day_number: number
  topic: string
  status: string
}

export type GroupedWeek = {
  id: string
  week_number: number
  days: Day[]
}

export type Resource = {
  id: number,
  type: string,
  url: string,
  day_id: string
}

export type NavMainItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
  hasSub: boolean
};

export interface GeneratePlanInput {
  tech: string,
  duration: string,
  goal: string
}