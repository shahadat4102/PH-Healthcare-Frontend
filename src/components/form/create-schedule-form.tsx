import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { scheduleSchema } from "@/validation/schedule.validation";
import { toast } from "../ui/toast";
import { useCreateSchedule } from "@/hooks/schedule.hook";


export default function CreateScheduleForm({handleClose} : {handleClose: () => void}) {

    const { mutate: create, isPending } = useCreateSchedule();

    const form = useForm({
        defaultValues : {
            date: "",
            startTime: "",
            endTime: "",
            meetingLink: "https://meet.google.com/aiu-ctor-moh",
        },
        validators: {
            onSubmit: scheduleSchema,
        },
        onSubmit: ({value}) => {
           const scheduleValue = {
             startDateTime: new Date (`${value.date}T${value.startTime}`).toISOString(),
             endDateTime:  new Date (`${value.date}T${value.endTime}`).toISOString(),
             meetingLink: value.meetingLink,
           };
           create(scheduleValue, {
            onSuccess: (res) => {
                if (!res.success) {
                    toast.add({
                        title: "Server Failure",
                        description: "Something went wrong. Please try again",
                        type: "error",
                    });
                    return
                }
                toast.add({
                    title: "Schedule Created",
                    description: "Your schedule is saved as a draft",
                    type: "success",
                });
                handleClose();
            },
            onError: (err) => {
                toast.add({
                    title: "Schedule creation failed",
                    description:
                    err.message || "Something went wrong. Please try again",
                    type: "error",
                });
              handleClose();
            },

           });
           
        },
    });

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit()
        }}
        >
            <FieldGroup>

                <form.Field name="date">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                        const selected = field.state.value
                           ? new Date(`${field.state.value}T00:00:00`)
                           : undefined;
                          

                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                                  <Popover>
                                    <PopoverTrigger render={<Button variant="outline" />}>
                                       { selected ? `${format(selected, "PPP")}` : "Select Data"}
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar 
                                          mode="single"
                                          selected={selected}
                                          disabled={{before: new Date()}}
                                          onSelect={(data) => {
                                            if(data) {
                                                field.handleChange(format(data, "yyyy-MM-dd"));
                                                field.handleBlur();
                                            }
                                          }}
                                        />
                                    </PopoverContent>
                                  </Popover>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>
             <div className="grid grid-cols-2 gap-3"> 

                <form.Field name="startTime">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Start Time</FieldLabel>
                                <Input
                                  type="time"
                                   id={field.name}
                                   name={field.name}
                                   value={field.state.value}
                                   onChange={(e) => field.handleChange(e.target.value)}
                                   onBlur={field.handleBlur}
                                />
                            </Field>
                        );
                    }}
                </form.Field>

                 <form.Field name="endTime">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>End Time</FieldLabel>
                                <Input
                                  type="time"
                                   id={field.name}
                                   name={field.name}
                                   value={field.state.value}
                                   onChange={(e) => field.handleChange(e.target.value)}
                                   onBlur={field.handleBlur}
                                />
                            </Field>
                        );
                    }}
                </form.Field>
              </div>
                <form.Field name="meetingLink">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Metting Link</FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    autoComplete="off"
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>
            

                <Button type="submit">  Submit </Button>


            </FieldGroup>
        </form>
    )
}