import { Book, ChevronRight, Plus, Target, Code2, LogOutIcon } from "lucide-react"
import { NavUser } from "../nav-user"
import { NavMainItem } from "@/data/definitions"
import { useSession } from "@/hooks/useSession"
import { handleSignOut } from "@/lib/actions"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import Link from "next/link"
import { fetchUserPlans } from "@/lib/data"
import { Suspense } from "react"
import { Badge } from "@/components/ui/badge"

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

const PlansSidebarSkeleton = () => (
  <div className="space-y-2 px-3">
    <div className="h-4 bg-muted/50 rounded animate-pulse"></div>
    <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4"></div>
    <div className="h-4 bg-muted/50 rounded animate-pulse w-1/2"></div>
  </div>
)

export async function AppSidebar() {
  const session = await useSession()
  if (!session) return null

  const plans = await fetchUserPlans()

  return (
    <Sidebar defaultValue="true" className="border-r border-border/50">
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
        <SidebarMenu>
          {navMain.map((item) => (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title} className="group">
                  <Link href={item.url} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors">
                      <item.icon />
                    </div>
                    <span className="font-medium">{item.title}</span>
                    {plans && plans.length > 0 && item.hasSub && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {plans.length}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
                
                {item.hasSub ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90 transition-transform duration-200">
                        <ChevronRight className="w-4 h-4" />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Suspense fallback={<PlansSidebarSkeleton />}>
                        <SidebarMenuSub className="mt-2">
                          <>
                            {plans && plans.length > 0 ? (
                              plans?.map((plan) => (
                                <SidebarMenuSubItem key={plan.name}>
                                  <SidebarMenuSubButton asChild className="group">
                                    <Link 
                                      href={`/plans/${plan.id}`}
                                      className="flex items-center gap-3 px-0 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                      <div className="w-2 h-2 bg-primary/60 rounded-full group-hover:bg-primary transition-colors"></div>
                                      <span className="text-sm truncate">{plan.name}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))
                            ) : (
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="group">
                                  <Link 
                                    className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors" 
                                    href="/plans/create"
                                  >
                                    <span className="text-sm">Create a plan</span>
                                    <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                            
                            {plans && plans.length > 0 && (
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild className="group">
                                  <Link 
                                    className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors" 
                                    href="/plans/create"
                                  >
                                    <span className="text-sm">Add a plan</span>
                                    <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )}
                          </>
                        </SidebarMenuSub>
                      </Suspense>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
        <SidebarFooter className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <NavUser user={{ email: session.email ?? null, image: session.image ?? undefined}} />
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