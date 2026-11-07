import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import CreateScheduleForm from "../form/create-schedule-form";

export default function ScheduleCreateDiilog () {
    const [open, setopen] = useState(false)
 

    return (
       <Dialog open={open} onOpenChange={setopen}>
           <DialogTrigger render={<Button size="lg" />}> Create Schedule </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Create Schedule </DialogTitle>
                     <DialogDescription> This Schedule will be visible to patient</DialogDescription>
                 </DialogHeader>
                 <CreateScheduleForm handleClose={() => setopen(false)} />
               </DialogContent>
       </Dialog>
    )
}