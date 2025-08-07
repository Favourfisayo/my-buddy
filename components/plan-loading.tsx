export default function PlanLoadingUI() {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-lg font-medium text-muted-foreground">Creating your plan...</p>
      </div>
    )
  }