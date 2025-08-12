import Phase from "@/components/phase/phase"
import { Suspense } from "react"
import { PhaseSkeleton } from "@/components/skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Phase"
}
const page = async ({params}: {
  params: Promise<{plan_id: string, phase_id: string}>
}) => {
  const { phase_id} = await params
  
  return (
    <div className="min-h-screen w-full bg-background">
      <main className="py-8">
        <Suspense fallback={<PhaseSkeleton />}>
          <Phase phase_id={phase_id} />
        </Suspense>
      </main>
    </div>
  )
}

export default page