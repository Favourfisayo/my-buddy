import { fetchPlanById, fetchPhasesWithWeekCount, fetchPlanProgressData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Calendar, Target, ArrowRight, BookOpen, Clock } from "lucide-react"

const PlanPhases = async ({ plan_id }: {
  plan_id: string
}) => {
  const plan = await fetchPlanById(plan_id)
  const phases = await fetchPhasesWithWeekCount(plan_id)
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

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Target className="w-4 h-4 mr-2" />
            Learning Plan
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            {plan?.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {plan?.goal}
          </p>
        </div>
        
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">{phasesData}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{weeksData}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{monthsData}</span>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Your Learning Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{`${progressRounded}%`} Complete</span>
            </div>
            <Progress value={progressRounded} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Start your journey by selecting a phase below
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Learning Phases</h2>
          <p className="text-muted-foreground">
            Complete each phase to master your skills step by step
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {phases?.map((phase, index) => (
            <Card
              key={phase.id}
              className="group border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-semibold">
                        {phase.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        Phase {index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">{phase.week_count} {phase.week_count === 1 ? "Week" : "Weeks"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="secondary" className="text-xs">
                      Not Started
                    </Badge>
                  </div>
                </div>
                
                <Link href={`/plans/${phase.plan_id}/phases/${phase.id}`} className="block">
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <span>View Phase</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completion Summary */}
      {phases && phases.length > 0 && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Plan Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">{phasesData}</div>
                <div className="text-sm text-muted-foreground">Total Phases</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">{weeksData}</div>
                <div className="text-sm text-muted-foreground">Total Weeks</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">{monthsData}</div>
                <div className="text-sm text-muted-foreground">Months (approx)</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">{`${progressRounded}%`}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PlanPhases