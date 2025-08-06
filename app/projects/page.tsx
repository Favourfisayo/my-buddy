import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Code2, 
  Sparkles, 
  Clock, 
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Code2 className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcase your learning journey with amazing projects
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary animate-bounce" />
              </div>

              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Coming Soon
              </Badge>

              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                This feature would be coming soon...
              </h2>
              

              <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mb-10">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Project Portfolio</h3>
                  <p className="text-sm text-muted-foreground">
                    Build Projects pertaining to your learning journey.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your project milestones and learning achievements.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Better Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Leave the tutorial hell and build projects!
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/plans">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Plans
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage