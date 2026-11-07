"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Suspense, useState } from "react";
import ScheduleListLoding from "./schedule-list-loding";
import { Button } from "../ui/button";
import { ScheduleParams, ScheduleStatus } from "@/types/schedule.type";
import ScheduleTable from "./schedule-table";
import ScheduleCreateDiilog from "./schedule-create-dialog";


const statuses: ["ALL" | ScheduleStatus, string][] = [
    ["ALL", "All"],
    ["DRAFT", "Draft"],
    ["PUBLISHED", "Published"],

];


export default function ScheduleList() {
    const [tab, setTab] = useState<"ALL" | ScheduleStatus>("ALL");


    const queryParams: ScheduleParams = {
        page: 1,
        limit:10,
        sortBy: "startDateTime",
        sortOrder: "asc",
        ...(tab === "ALL" ? {} : {status: tab})
    };


    return (
        <>
            <div className=" flex justify-between my-5 gap-3">

                <Tabs value={tab} onValueChange={(value)  => setTab(value)} >
                  <TabsList>
                        {
                           statuses.map(([value, label]) => (
                            <TabsTrigger key={value} value={value}>
                               {label}
                            </TabsTrigger>
                           ))
                        }

                    </TabsList>
                </Tabs>
               <ScheduleCreateDiilog/>
            </div>

            <Suspense fallback={<ScheduleListLoding />}>
                <ScheduleTable {...(queryParams as any)} />
            </Suspense>

        </>

    );
}




