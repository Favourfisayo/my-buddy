import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export const metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4 text-center">
      <div className="space-y-8 max-w-md">
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-sm mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/" className="block">
            <Button className="w-full max-w-xs" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Go Back Home
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            Or try navigating using the sidebar menu
          </p>
        </div>
      </div>
    </div>
  )
}