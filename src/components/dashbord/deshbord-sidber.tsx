
"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserRole } from "@/types"
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes"
import { SidbareItems } from "@/types/sidebar.type"
import Link from "next/link"
import { usePathname } from "next/navigation"


const sidebarRoutes: Partial<Record<UserRole, SidbareItems>> = {
    SUPER_ADMIN: adminRoutes,
    ADMIN: adminRoutes,
    DOCTOR: doctorRoutes,
    PATIENT: patientRoutes
}
export function DeshbordSidebar({role} : {role:UserRole}) {
  const pathname = usePathname();
    const routes: SidbareItems = sidebarRoutes[role] || []

  return (
    <Sidebar >
      <SidebarHeader>
        <Link href="/"> 
        <span> PH Healthcare </span>
        </Link>
       
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                     render={<Link href={item.url}/>} 
                     isActive={pathname === item.url}
                     >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
