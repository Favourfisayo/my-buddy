import PlanPhases from "@/components/phase/plan-phases"
import { Suspense } from "react"
import { PlanPhasesSkeleton } from "@/components/skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plan"
}
const page = async ({params}: {
  params: Promise<{plan_id: string}>
}) => {
  const {plan_id} = await params
  
  return (
    <div className="min-h-screen w-full bg-background">
      <main className="py-8">
        <Suspense fallback={<PlanPhasesSkeleton />}>
          <PlanPhases plan_id={plan_id} />
        </Suspense>
      </main>
    </div>
  )
}

export default page