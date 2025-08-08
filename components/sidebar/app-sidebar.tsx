import { Book, Target, Code2, LogOutIcon } from "lucide-react"
import { NavUser } from "../nav-user"
import { NavMainItem } from "@/data/definitions"
import { handleSignOut } from "@/lib/actions"
import { getSession } from "@/utils/getSession"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { fetchUserPlans } from "@/lib/data"
import NavMain from "./nav-main"

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

export async function AppSidebar() {
  const session = await getSession()
  const plans = await fetchUserPlans()

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
          <NavUser user={{ email: session?.email ?? null, image: session?.image ?? undefined}} />
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