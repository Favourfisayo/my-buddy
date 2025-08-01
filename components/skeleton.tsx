import { Skeleton } from "./ui/skeleton"
import { CardContent, Card } from "./ui/card"

export const PhaseSkeleton = () => (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-16 w-96 mx-auto" />
        <div className="flex justify-center gap-8">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/50 bg-card/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  export const PlanPhasesSkeleton = () => (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-16 w-96 mx-auto" />
        <Skeleton className="h-8 w-80 mx-auto" />
        <div className="flex justify-center gap-8">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
      <div className="space-y-6">
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  export const DaySkeleton = () => (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-16 w-96 mx-auto" />
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-8">
        <div className="text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-6 w-48" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="border-border/50 bg-card/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-10 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )