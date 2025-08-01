import PlanPhases from "@/components/plan-phases"
import { Suspense } from "react"
import { PlanPhasesSkeleton } from "@/components/skeleton"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"


const page = async ({params}: {
  params: Promise<{plan_id: string}>
}) => {
  const {plan_id} = await params
  
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Navigation Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/plans"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Plans
            </Link>
            <div className="w-px h-4 bg-border" />
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <Suspense fallback={<PlanPhasesSkeleton />}>
          <PlanPhases plan_id={plan_id} />
        </Suspense>
      </main>
    </div>
  )
}

export default page