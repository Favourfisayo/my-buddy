import UserPlans from "@/components/user-plan"
import { Suspense } from "react"

const page = () => {
  return (
    <section className="w-full px-0 py-12">
      {/* Header Section */}
      <div className="w-full max-w-full mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            Your Plans
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Track your progress in your learning
          </p>
        </div>
        <Suspense>
          <UserPlans/>
        </Suspense>
      </div>
    </section>
  )
}

export default page