import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, ArrowRight, PlusCircle } from "lucide-react"
import { Badge } from "./ui/badge"
import { fetchUserPlans } from "@/lib/data"
import { Button } from "./ui/button"
import Link from "next/link"

const UserPlans = async () => {
  const plans = await fetchUserPlans()
  return (
    <div className="w-full">
      {plans && plans.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="w-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <CardHeader className="pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground flex flex-col gap-1">
                    <Badge className="flex items-center gap-1 border-none">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{plan.duration}</span>
                    </Badge>
                    <span>{plan.goal}</span>
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Progress
                    </span>
                    <span className="font-medium text-foreground">6/12 weeks</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>

              <CardFooter className="pt-2 flex flex-col gap-2 items-center">
                <p className="text-xs text-muted-foreground w-full text-center">
                  {plan.created_at}
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
