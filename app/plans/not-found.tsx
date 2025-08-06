import { Button } from '@/components/ui/button'
import { AlertTriangle, Home } from 'lucide-react'
import Link from 'next/link'
export default async function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-8 max-w-md">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight">404</h1>
            <h2 className="text-2xl font-semibold">Plan Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-sm mx-auto">
              The learning plan you're looking for doesn't exist or has been removed.
            </p>
            <Link href='/plans'>
            <Button>
              <Home/>
              Go Home
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}