"use client"

import { useGetNe } from "@/hooks"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoding from "./auth.loding";

export default function AuthGuard({children}: {children: ReactNode}) {
    const router = useRouter();

    const {data, isPending, isError} = useGetNe();
    
    const user = data?.data;


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
    return<>  {children}</>
    
}