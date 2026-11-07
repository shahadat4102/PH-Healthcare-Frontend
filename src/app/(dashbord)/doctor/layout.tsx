
import RoleGuard from "@/components/auth/role.guard";
import DeshbordShell from "@/components/dashbord/seshbord-shell";
import { ReactNode } from "react";


export default function Layout({children}: {children: ReactNode}) {
     
    return <RoleGuard roles={["DOCTOR"]}>
        <DeshbordShell {...{ role: "DOCTOR" }}> {children} </DeshbordShell>
       
     </RoleGuard>
}