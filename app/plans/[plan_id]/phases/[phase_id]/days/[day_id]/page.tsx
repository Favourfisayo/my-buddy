import Day from "@/components/days/Day"
import { Suspense } from "react"
import { DaySkeleton } from "@/components/skeleton"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

const page = async ({params}: {
    params: Promise<{day_id: string, phase_id: string, plan_id: string}>
}) => {
    const {day_id, phase_id, plan_id} = await params
    
    return (
        <div className="min-h-screen w-full bg-background">
            <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={`/plans/${plan_id}/phases/${phase_id}`}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Phase
                        </Link>
                        <div className="w-px h-4 bg-border" />
                        <Link 
                            href="/plans"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            Plans
                        </Link>
                    </div>
                </div>
            </div>

            <main className="py-8">
                <Suspense fallback={<DaySkeleton />}>
                    <Day day_id={day_id} phase_id={phase_id}/>
                </Suspense>
            </main>
        </div>
    )
}

export default page