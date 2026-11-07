import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import { Schedule } from "@/types/schedule.type";

interface Props {
    schedule: Schedule;
    open: boolean;
    onClose: () => void;
}

function formatDateTime(value: string) {
    return new Date(value).toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short",
    });
}

export default function ScheduleDetailSheet({ schedule, open, onClose }: Props) {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Schedule Details</SheetTitle>
                    <SheetDescription>
                        View your schedule information
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Start Date & Time</h3>
                        <p className="mt-1 text-sm">{formatDateTime(schedule.startDateTime)}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">End Date & Time</h3>
                        <p className="mt-1 text-sm">{formatDateTime(schedule.endDateTime)}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Total Slots</h3>
                        <p className="mt-1 text-sm">{schedule.totalSlots}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Available Slots</h3>
                        <p className="mt-1 text-sm">{schedule.availableSlots}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Booked Slots</h3>
                        <p className="mt-1 text-sm">{schedule.totalSlots - schedule.availableSlots}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <p className={`mt-1 text-sm font-medium ${
                            schedule.status === "PUBLISHED" ? "text-green-600" : "text-amber-600"
                        }`}>
                            {schedule.status}
                        </p>
                    </div>

                    {schedule.meetingLink && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Meeting Link</h3>
                            <a 
                                href={schedule.meetingLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-1 text-sm text-blue-600 hover:underline break-all"
                            >
                                {schedule.meetingLink}
                            </a>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
