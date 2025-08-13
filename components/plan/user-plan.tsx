import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { AlertDialog } from "./alert-dialog"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, ArrowRight, PlusCircle } from "lucide-react"
import { Badge } from "../ui/badge"
import { fetchUserPlans } from "@/lib/data"
import { Button } from "../ui/button"
import Link from "next/link"
import { getPlanAndPhaseData } from "@/utils/getPlanAndPhaseData"
import { Plan } from "@/data/definitions"

const UserPlans = async () => {

  const plans = await fetchUserPlans()
  const plansWithProgress = await Promise.all(
    (plans || []).map(async (plan: Plan) => {
      try {
        const progressData = await getPlanAndPhaseData(plan.id)
        return {
          ...plan,
          progress: progressData.progressRounded,
          weeksData: progressData.weeksData
        }
      } catch (error) {
        console.error(`Error fetching progress for plan ${plan.id}:`, error)
        return {
          ...plan,
          progress: 0,
          weeksData: "0 Weeks"
        }
      }
    })
  )

  return (
    <div className="w-full">
      {plansWithProgress && plansWithProgress.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plansWithProgress.map((plan) => (
            <Card
              key={plan.id}
              className="w-full h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group flex flex-col"
            >
              <CardHeader className="pb-3 flex-shrink-0">
                <div className="space-y-2">
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex-1 min-w-0">{plan.name}</span>
                      <AlertDialog
                      plan_id = {plan.id}
                      />
                    </div>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground space-y-2">
                    <Badge className="flex items-center gap-1 border-none w-fit">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span>{plan.duration} weeks</span>
                    </Badge>
                    {plan.goal && (
                      <p className="text-xs line-clamp-2 leading-relaxed">
                        Goal: {plan.goal}
                      </p>
                    )}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-0 pb-3 flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Progress
                      </span>
                      <span>{plan.progress}%</span>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex flex-col gap-3 items-stretch">
                <p className="text-xs text-muted-foreground text-center">
                  Created: {new Date(plan.created_at).toLocaleDateString()}
                </p>
                <Link href={`/plans/${plan.id}`} className="w-full">
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Plan
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-muted/30">
            <PlusCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No plans yet</h3>
          <p className="text-base text-muted-foreground mb-6">Create your first plan to spark your learning journey.</p>
          <Link href="/plans/create">
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Create your first plan
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserPlans
