


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DeshbordSidebar } from "./deshbord-sidber"
import { ReactNode } from "react"
import { UserRole } from "@/types";

export default function DeshbordShell({children, role}: {children: ReactNode; role: UserRole}) {
  return (
    <SidebarProvider>
      <DeshbordSidebar role={role}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
