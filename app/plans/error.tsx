"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

const Error = ({error, reset}: {
    error: Error & {digest?: string}
    reset: () => void
}) => {
    useEffect(() => {
        console.error(error)
    }, [error])
    
    return (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Something went wrong</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center space-y-2">
                        <p className="text-muted-foreground">
                            We encountered an error...
                        </p>
                        {error.digest && (
                            <p className="text-xs text-muted-foreground font-mono">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <Button 
                            onClick={() => reset()}
                            className="w-full flex items-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </Button>
                        <Link href="/plans" className="w-full">
                            <Button variant="outline" className="w-full flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Go back to plans
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Error