"use client"

import { useGetNe } from "@/hooks"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoding from "./auth.loding";
import { UserRole } from "@/types";
import AccessDenied from "./eccess.denied";

interface Iprops {
    children: ReactNode;
    roles: UserRole[];
}

export default function RoleGuard({children, roles}: Iprops) {
    const router = useRouter();

    const {data, isPending, isError} = useGetNe();
    
    const user = data?.data;

    const isAuthorized = !!user && roles.includes(user.role);


    useEffect(() => {
        if(isPending){
            return
        }
        if(isError || !user){
            router.replace("/login")
        }
    }, [isPending, isError, user, router])


     if(isPending) {
        return <AuthLoding label="Loading..." />
     }

      if(isError || !user){
        return <AuthLoding label="Redirecting..." /> 
        }

       if(isAuthorized) {
        return <> {children} </>
       } 

    return <AccessDenied/>
    
}