import UserPlans from "@/components/plan/user-plan"
import { UserPlansSkeleton } from "@/components/skeleton"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plans"
}
const page = () => {
  return (
    <section className="w-full px-0 ">
      <div className="w-full max-w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            Your Plans
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Track your progress in your learning
          </p>
        </div>
        <Suspense fallback={<UserPlansSkeleton />}>
          <UserPlans/>
        </Suspense>
      </div>
    </section>
  )
}

export default page