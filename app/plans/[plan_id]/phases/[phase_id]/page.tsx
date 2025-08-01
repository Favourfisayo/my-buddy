import Phase from "@/components/phase"
import { Suspense } from "react"
import { PhaseSkeleton } from "@/components/skeleton"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


const page = async ({params}: {
  params: Promise<{plan_id: string, phase_id: string}>
}) => {
  const {plan_id, phase_id} = await params
  
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href={`/plans/${plan_id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Plan
          </Link>
        </div>
      </div>

      <main className="py-8">
        <Suspense fallback={<PhaseSkeleton />}>
          <Phase phase_id={phase_id} />
        </Suspense>
      </main>
    </div>
  )
}

export default page