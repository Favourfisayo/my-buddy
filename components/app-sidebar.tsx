import { Book,  ChevronRight, Plus } from "lucide-react"
import { NavUser } from "./nav-user"
import {  NavMainItem } from "@/data/definitions"
import { useSession } from "@/hooks/useSession"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
}from "@/components/ui/collapsible"
import Link from "next/link"
import { fetchUserPlans } from "@/lib/data"
import { Suspense } from "react"
// Menu items.
  const navMain: NavMainItem[] = [
    {
      title: "Plans",
      url: "/plans",
      icon: Book,
      isActive: true,
    }
  ]

export async function AppSidebar() {
    const session = await useSession()
    if (!session?.email) return null

    const plans = await fetchUserPlans()

  return (
    <Suspense>
    <Sidebar defaultValue="true">
        <SidebarHeader>
            Your plans
        </SidebarHeader>
        <SidebarContent>
        <SidebarMenu>
        {navMain.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {plans ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                        <>
                      {plans.length > 0 ? plans?.map((plan) => (
                        <SidebarMenuSubItem key={plan.name}>
                          <SidebarMenuSubButton asChild>
                            <Link href={`/plans/${plan.id}`}>
                              <span>{plan.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))
                      :
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link className="flex flex-1 justify-between" href="/plans/create">
                              <span>Create a plan</span>
                              <Plus/>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    }
                        {plans.length > 0 && <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link className="flex flex-1 justify-between" href="/plans/create">
                              <span>Add a plan</span>
                              <Plus/>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>}
                    </>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) 
              : 
              null
              }
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
        </SidebarContent>

      <SidebarFooter>
        <NavUser user={{ email: session.email ?? null }} />
      </SidebarFooter>
    </Sidebar>
    </Suspense>
  )
}