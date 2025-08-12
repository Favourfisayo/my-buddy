import MultiStepForm from "@/components/forms/multi-step-form"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Plan"
}
const page = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <main className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Your Learning Journey
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Create a Plan
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let&apos;s build a personalized learning path that fits your goals and schedule
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <MultiStepForm />
          </div>
        </div>
      </main>
    </div>
  )
}

export default page