"use client"
import { Book, Target, Code2, LogOutIcon } from "lucide-react"
import { NavUser } from "../nav-user"
import { NavMainItem } from "@/data/definitions"
import { handleSignOut } from "@/lib/actions"
import { Suspense } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Plan } from "@/data/definitions"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import NavMain from "./nav-main"
import PlanLoadingUI from "../plan-loading"

// Menu items.
const navMain: NavMainItem[] = [
  {
    title: "Plans",
    url: "/plans",
    icon: Book,
    isActive: true,
    hasSub: true
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Code2,
    isActive: false,
    hasSub: false
  }
]

export function AppSidebar() {
    const [plans, setPlans] = useState<Plan[] | undefined>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetch('/api/user-plans')
        const data = await response.json()
        setPlans(data)
      } catch (error) {
        console.error('Failed to load plans:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [])
    if (loading) {
    return (
      <Sidebar className="border-r border-border/50">
        <SidebarHeader className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <PlanLoadingUI/>
        </SidebarHeader>
      </Sidebar>
    )
  }
  return (
    <Sidebar defaultValue="true" className="border-r border-border/50 ">
      <SidebarHeader className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Your Plans</h2>
            <p className="text-xs text-muted-foreground">Learning Journey</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <NavMain navMain={navMain} plans={plans}/>
      </SidebarContent>
        <SidebarFooter className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <Suspense>
          <NavUser />
        </Suspense>
          <form action={handleSignOut}>
          <SidebarMenuButton asChild type="submit">
            <button type="submit">
            <LogOutIcon/>
            Log out
            </button>
          </SidebarMenuButton>
          </form>
        </SidebarFooter>
    </Sidebar>
  )
}