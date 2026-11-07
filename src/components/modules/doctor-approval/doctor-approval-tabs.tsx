"use client";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs"
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalLoding from "./doctor-approval-table-loding";
import { DoctorParams, DoctorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DoctorReviewSheet from "./doctor-review-sheet";
import useDebounce from "@/hooks/debouns.hook";


const verificationStatus: [string, string][] = [
    ["APPROVED", "Approved"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["ALL", "All"]
]


export default function DoctorApprovalTabs() {

    const [Tab, setTab] = useState<"ALL" | DoctorVerificationStatus>("ALL");
    const [selectedId, setselectedId] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(searchInput, 500);
    
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setPage(1);
    }


    const queryParams: DoctorParams = {
        page,
        limit: 1,
         ...( Tab === "ALL" ? {} :  {verificationStatus: Tab}),
        ...(debouncedSearch ? {search: debouncedSearch} : {})
    }
 
    
    return (
        <> 
        <div className=" flex justify-between my-5">
            <div>
             <Input 
             onChange={(e) => handleSearch(e)}
             type="cearch" placeholder="Search by name of email" 

             />

            </div>
      
            <Tabs value={Tab} onValueChange={(value) => setTab(value)} >
                <TabsList>
                    {
                        verificationStatus.map(([value, label]) => (
                           <TabsTrigger key={value} value={value}> {label} </TabsTrigger>
                        ))
                    }
                  
                </TabsList>
            </Tabs>
             </div>

            <Suspense fallback={<DoctorApprovalLoding/>}>
             <DoctorApprovalTable {...queryParams} handleReview={setselectedId} handlePageChange={setPage} />
            </Suspense>

         

            <DoctorReviewSheet 
              selectedId={selectedId} 
              onClose={() => setselectedId("")}
              {...queryParams}
                />

            </>
     
    )
}




            