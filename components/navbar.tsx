"use client"
import Link from "next/link"
import { Home, ArrowLeft } from "lucide-react"
import { SidebarTrigger } from "./ui/sidebar"
const Navbar = () => {
  return (
    <>
    <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger/>
            <Link 
              href="/plans"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Plans
            </Link>
            <div className="w-px h-4 bg-border" />
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar