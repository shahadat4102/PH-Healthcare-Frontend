

import VerifyForm from "@/components/form/verify-form"
import Link from "next/link"
import { Suspense } from "react"

export default function VerifyAccountPage() {
    return(
      <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            
            PH Healthcare
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<p>Loding.....</p>}>
                <VerifyForm mode="patient"/>
            </Suspense>
             
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img 
          src="/register.jpg"
          alt=""
          className="absolute inset-0 h-200 w-100 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    )
}