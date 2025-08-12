import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const PhaseSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
    {/* Header */}
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32 mx-auto rounded-md" /> {/* Badge */}
        <Skeleton className="h-12 w-64 md:h-14 md:w-80 mx-auto" /> {/* Phase title */}
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
    </div>

    <Skeleton className="h-px w-full" /> {/* Separator */}

    {/* Weeks List */}
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-6 w-28" /> {/* Week title */}
              </div>
              <Skeleton className="h-5 w-16 rounded-full" /> {/* Days badge */}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Accordion Trigger */}
            <div className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Icon */}
            </div>

            {/* Accordion Content (Day items) */}
            <div className="space-y-4 pt-4">
              {[1, 2].map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border/30 bg-muted/30"
                >
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded-sm" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Phase Overview */}
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-8 w-12 mx-auto" /> {/* Number */}
              <Skeleton className="h-4 w-20 mx-auto" /> {/* Label */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const PlanPhasesSkeleton = () => (
  <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
    {/* Header Section */}
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32 mx-auto rounded-md" /> {/* Badge */}
        <Skeleton className="h-12 w-64 md:h-16 md:w-96 mx-auto" /> {/* Plan name */}
        <Skeleton className="h-6 w-80 mx-auto" /> {/* Plan goal */}
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap justify-center gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
    </div>

    <Skeleton className="h-px w-full" /> {/* Separator */}

    {/* Progress Card */}
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-5 w-40" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-64" />
        </div>
      </CardContent>
    </Card>

    {/* Learning Phases Section */}
    <div className="space-y-6">
      <div className="text-center">
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    {/* Plan Summary */}
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-8 w-12 mx-auto" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);


export const DaySkeleton = () => (
  <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
    {/* Header */}
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-32 mx-auto rounded-md" /> {/* Badge */}
        <Skeleton className="h-12 w-64 md:h-14 md:w-96 mx-auto" /> {/* Day topic */}
      </div>
    </div>

    <Skeleton className="h-px w-full" /> {/* Separator */}

    {/* Day progress tracking card */}
    <Skeleton className="h-32 w-full rounded-lg" />

    {/* Learning Section */}
    <div className="space-y-8">
      <div className="text-center">
        <Skeleton className="h-8 w-48 mx-auto mb-2" /> {/* Section title */}
        <Skeleton className="h-5 w-80 mx-auto" /> {/* Section description */}
      </div>

      {/* Resources section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-sm" /> {/* Icon */}
          <Skeleton className="h-5 w-40" /> {/* Heading */}
        </div>

        {/* Resource cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-32" /> {/* Resource title */}
                <Skeleton className="h-4 w-16" /> {/* Type / meta */}
                <Skeleton className="h-10 w-full" /> {/* Button */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

    {/* Footer Navigation */}
    <div className="flex justify-between items-center pt-8">
      <Skeleton className="h-10 w-40" /> {/* Back to Phase button */}
      {/* Potential Next/Previous Day buttons */}
      {/* <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div> */}
    </div>
  </div>
);


export const UserPlansSkeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="w-full border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <CardHeader className="pb-2">
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            </CardContent>

            <CardContent className="pt-2 space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const PlansSidebarSkeleton = () => (
  <div className="space-y-2 px-3">
    <div className="h-4 bg-muted/50 rounded animate-pulse"></div>
    <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4"></div>
    <div className="h-4 bg-muted/50 rounded animate-pulse w-1/2"></div>
  </div>
)