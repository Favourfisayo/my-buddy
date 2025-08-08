import { fetchResourcesByDayId, fetchWeeksAndDaysByPhaseId } from "@/lib/data"
import { groupWeeksWithDays } from "@/utils/groupWeeksWithDays"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Calendar,  ArrowLeft } from "lucide-react"
import Link from "next/link"
import DayCard from "./DayCard"
import { ResourceCard } from "../resource/ResourceCards"
import EmptyResourceCard from "../resource/ResourceCards"

const Day = async ({day_id, phase_id}: {
    day_id: string,
    phase_id: string
}) => {
    const [resources, rawData] = await Promise.all([
         fetchResourcesByDayId(day_id),
         fetchWeeksAndDaysByPhaseId(phase_id)
    ])
    const structured = groupWeeksWithDays(rawData)

    const daysRow = structured.map((data) => {
        return data.days
    })
    const days = daysRow[0]?.map((day) => {
        return day
    })

    const day = days?.filter((day) => day.id === day_id)[0]
    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-6">
                <div className="space-y-4">
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-2" />
                        Day {day.day_number}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                        {day.topic}
                    </h1>
                </div>
            </div>

            <Separator className="my-8" />

            {/* Day Progress Tracking */}
                <DayCard
                status = {day.status}
                id = {day.id}
                />
            {/* Learning Resources and Content */}
            <div className="space-y-8">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Today&apos;s Learning</h2>
                    <p className="text-muted-foreground">
                        Explore the resources and materials for today&apos;s topic
                    </p>
                </div>

                {resources && resources.length > 0 ? (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Learning Resources
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {resources.map((resource, index) => (
                                <ResourceCard
                                key={resource.id}
                                resource = {resource}
                                index = {index}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <EmptyResourceCard/>
                )}
            </div>

            <div className="flex justify-between items-center pt-8">
                <Link href={`/plans/${phase_id}/phases/${phase_id}`}>
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Phase
                    </Button>
                </Link>
                { /** <div className="flex gap-2">
                    <Button variant="outline" disabled>
                        Previous Day
                    </Button>
                    <Button variant="outline" disabled>
                        Next Day
                    </Button>
                </div> **/}
            </div>
        </div>
    )
}

export default Day