import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { useApproveDoctor, useGetAllDoctors } from "@/hooks"
import { ApproveDoctorPayloat, DoctorParams } from "@/types"
import { useState } from "react"

interface Props extends DoctorParams {
    selectedId: string
     onClose: ()=> void
}


export default function DoctorReviewSheet({selectedId,  onClose, ...params}: Props) {

     const [confiramReview, setconfiramReview] = useState(false)
     const [rejectionReason, setrejectionReason] = useState("")

    const {data} = useGetAllDoctors(params)
    const {mutate: verify, isPending} = useApproveDoctor();

    const selectDoctor = data?.data?.find((doctor) => doctor.id === selectedId)
    if(!selectDoctor) {
        return null;
    }
   
    const handelClose = () => {
      setconfiramReview(false)
      setrejectionReason("")
      onClose()
    }

    const handelReviewAction = (status: "APPROVED" | "REJECTED") => {
        const reviewData: ApproveDoctorPayloat = {
          doctorId: selectedId,
          verificationStatus: status,
          rejectionReason: rejectionReason || undefined,
        };
        
        verify(reviewData, {
          onSuccess: () => {
            handelClose();
          },
          onError: (error) => {
            console.error("Approval error:", error);
            alert(error.message || "Failed to update doctor status");
          }
        });
    }

    return (
        <Sheet open={!!selectedId} onOpenChange={handelClose} >
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Review and take action</SheetTitle>
                    <SheetDescription>This action cannot be undone.</SheetDescription>
                </SheetHeader>
                Doctor Name: {selectDoctor.name}

                <SheetFooter>
                    {
                      confiramReview ? (
                       <div className="flex flex-col gap-3"> 

                        <Textarea
                         value={rejectionReason}
                          onChange={(e) => setrejectionReason(e.target.value)}
                          />
                         
                        <div className="flex gap-2">   
                        <Button onClick={handelClose} variant="outline" size="lg" className="flex-1" >
                             Cancel
                           </Button>    

                        <Button onClick={() => handelReviewAction("REJECTED")} variant="destructive" size="lg" className="flex-1" disabled={!rejectionReason}>
                            Confirm Rejection
                          </Button>

                         </div> 
                       </div>
                      ) : (
                     <div className="flex gap-2">
                        <Button onClick={() => setconfiramReview(true)} variant="destructive" size="lg" className="flex-1">
                            Reject
                        </Button>

                        <Button onClick={() => handelReviewAction("APPROVED")} variant="default" size="lg" className="flex-1">
                            Approve
                        </Button> 
                    </div>
                      )
                    }
               
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
