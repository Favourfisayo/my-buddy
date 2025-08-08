import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchPhaseById, fetchWeeksAndDaysByPhaseId } from "@/lib/data"
import { groupWeeksWithDays } from "@/utils/groupWeeksWithDays"
import { Calendar, Clock, BookOpen, Target } from "lucide-react"
import Link from "next/link"
import { checkDataExists } from "@/utils/checkDataExists"

const Phase = async ({phase_id}: {
    phase_id: string
}) => {
    const [phase, rawData] = await Promise.all([
       fetchPhaseById(phase_id),
       fetchWeeksAndDaysByPhaseId(phase_id),
      
    ])
    checkDataExists(phase)

    const structured = groupWeeksWithDays(rawData)
    
    const totalWeeks = structured?.length || 0
    const totalDays = structured?.reduce((acc, week) => acc + week.days.length, 0) || 0

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Target className="w-4 h-4 mr-2" />
            Learning Phase
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            {phase?.title}
          </h1>
        </div>
        
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{totalWeeks} Weeks</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5" />
            <span className="font-medium">{totalDays} Days</span>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        {structured?.map((week) => (
          <Card key={week.week_number} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">{week.week_number}</span>
                  </div>
                  <CardTitle className="text-xl">Week {week.week_number}</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {week.days.length} days
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`week-${week.id}`} className="border-none">
                  <AccordionTrigger className="hover:no-underline py-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      View daily topics
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {week.days.map((day) => (
                        <Link
                        key={day.id}
                        href={`/plans/${phase?.plan_id}/phases/${phase?.id}/days/${day.id}`}
                        className="flex flex-col gap-1"
                        >
                        <div
                          className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{day.day_number}</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                              <h4 className="font-semibold text-sm">Day {day.day_number}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {day.topic}
                            </p>
                          </div>
                        </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {structured && structured.length > 0 && (
        <div className="mt-12">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Phase Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">{totalWeeks}</div>
                  <div className="text-sm text-muted-foreground">Total Weeks</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">{totalDays}</div>
                  <div className="text-sm text-muted-foreground">Total Days</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">{Math.ceil(totalDays / 7)}</div>
                  <div className="text-sm text-muted-foreground">Weeks (approx)</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">{Math.round(totalWeeks / 4)}</div>
                  <div className="text-sm text-muted-foreground">Months (approx)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Phase