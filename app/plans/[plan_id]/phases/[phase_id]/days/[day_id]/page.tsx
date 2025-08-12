import Day from "@/components/days/Day"
import { Suspense } from "react"
import { DaySkeleton } from "@/components/skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Day"
}
const page = async ({params}: {
    params: Promise<{day_id: string, phase_id: string, plan_id: string}>
}) => {
    const {day_id, phase_id} = await params
    
    return (
        <div className="min-h-screen w-full bg-background">
            <main className="py-8">
                <Suspense fallback={<DaySkeleton />}>
                    <Day day_id={day_id} phase_id={phase_id}/>
                </Suspense>
            </main>
        </div>
    )
}

export default page