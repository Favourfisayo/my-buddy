import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import Link from "next/link"
import { ExternalLink, BookOpen } from "lucide-react"
import { Resource } from "@/data/definitions"

export const ResourceCard = ({resource, index}: {
    resource: Resource,
    index: number
 }) => {
    return (
        <Card
        key={resource.id || index}
        className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg group"
    >
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {resource.type || `Resource ${index + 1}`}
                    </CardTitle>
                    {resource.type && (
                        <Badge variant="outline" className="text-xs">
                            {resource.type}
                        </Badge>
                    )}
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            {resource.url && (
                <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Resource
                    </Button>
                </Link>
            )}
        </CardContent>
    </Card>
    )
}

const EmptyResourceCard = () => {
    return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="py-12">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted/30 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">No Resources Available</h3>
                    <p className="text-muted-foreground">
                        Resources for this day will be added soon.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
    )
}

export default EmptyResourceCard