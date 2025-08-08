import { NavMainItem, Plan } from "@/data/definitions"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarMenuAction
  } from "@/components/ui/sidebar"
  import { Suspense } from "react"
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
  } from "@/components/ui/collapsible"
  import Link from "next/link"
  import { Badge } from "@/components/ui/badge"
  import { ChevronRight, Plus} from "lucide-react"
  import { PlansSidebarSkeleton } from "../skeleton"

 const NavMain = ({navMain, plans}: {
    navMain: NavMainItem[]
    plans: Plan[] | undefined
 }) => {
    return (
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
    )
}

export default NavMain