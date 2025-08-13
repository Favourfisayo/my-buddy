import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {SessionProvider} from "next-auth/react"
import Navbar from "@/components/navbar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <Navbar/>
        {children}
      </main>
    </SidebarProvider>
    </SessionProvider>
  )
}