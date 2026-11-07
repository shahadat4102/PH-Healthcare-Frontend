"use client"
import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react";



function makeQureyCliend () {

    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
            }
        }
    })
}
let browserQueryClient: QueryClient | undefined = undefined;

function getQureyClient() {
    if(environmentManager.isServer()){
        return makeQureyCliend();
    }else {
        if(!browserQueryClient){
             browserQueryClient = makeQureyCliend()
        }
        
        return browserQueryClient
    }
}

export default function QueryProvider ({children} : {children: ReactNode}) {
    
    const QueryClient = getQureyClient()

    return(
        <QueryClientProvider client={QueryClient}> 
            {children}
        </QueryClientProvider>
    ) 
}