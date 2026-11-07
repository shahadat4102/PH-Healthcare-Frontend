"use client"
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import { FileText, FileUp, MapPin, Plus, X } from "lucide-react";
import { doctorApplicationSchema, isAcceptedFileSize, isAcceptedFileType, MAX_ADDITIONAL_FILES, MAX_FILE_SIZE } from "@/validation";
import { formatFileSize } from "@/utlie";
import { DoctorApplicationData } from "@/types/doctor.type";
import { useApplyAsDoctor } from "@/hooks";
import { toast } from "../ui/toast";





export default function DoctorApplyForm() {
  const router = useRouter();
  const {mutate: apply, isPending: applyPending} = useApplyAsDoctor();

    // const form = useForm({
    // defaultValues: {
    //   name: "Mir Hussain",
    //   email: "drmir@gmail.com",
    //   phone: "01912345678",
    //   address: "Marss",
    //   specialization: "Cardiologist",
    //   licenseNumber: "ABC123",
    //   qualifications: "MBBS",
    //   experienceYears: "50",
    //   consultationFee: "10000",
    //   bio: "My life, my rules.",
    //   resume: null as File | null,
    //   additionalFiles: [] as File[],
    // },

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experienceYears: "",
      consultationFee: "",
      bio: "",
      resume: null as File | null,
      additionalFiles: [] as File[],
    },

    validators: {
      onSubmit: doctorApplicationSchema as never
    },

    onSubmit: async ({ value }) => {
      const doctorData: DoctorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        doctor: {
          specialization: value.specialization.trim(),
          licenseNumber: value.licenseNumber.trim(),
          qualifications: value.qualifications.trim(),
          experienceYears: Number(value.experienceYears),
          contactNumber: value.phone.trim(),
          address: value.address.trim(),
          consultationFee: value.consultationFee.trim()
            ? Number(value.consultationFee)
            : undefined,
          bio: value.bio.trim(),
        },
      };
      apply({
        data: doctorData,
         resume: value.resume as File,
        additionalFiles: value.additionalFiles,
       }, {
         onSuccess: (res) => {
         if(!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
          return
         }

         toast.add({
          title: "Application Submitted",
          description: "Please verify your account",
          type: "success",
         });
         // your scarchParams
         const params = new URLSearchParams({
          email: doctorData.user.email,
         });
           // Routing verify account
         router.push(`/apply/account-verify?${params.toString()}`);
         },
         onError:(err) => {
          toast.add({
            title: "Application failure",
            description:
            err.message || "Something went wrong. Please try again",
            type: "error"
          });
         },
       })
    }
  })

  return (
    <div className=" flex flex-col gap-6">

      <div className=" flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Apply to join PH healthcare</h1>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
        noValidate
      >
        <FieldGroup>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Dr.Jack"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="name"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Doctor@Example.com"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="name"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Contact number</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="+8801987123121"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="name"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="address">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Practice address {" "} 
                      <span className="font-normal text-muted-foreground"> 
                        (optional)
                      </span>
                    </FieldLabel>
                    <div className="relative">
                      {/* <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground "/> */}
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Chamber or hospital address"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="name"
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>


          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="specialization">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Specialization</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="Cardiology"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="licenseNumber">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>BMDC registration number</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="A-12345"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="qualifications">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Qualifications</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="MBBS,FCPS(Medicine) "
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="experienceYears">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Years of Experience</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        placeholder="10"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="consultationFee">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Consultation Fee (BDT)</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      placeholder="1000"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>


          <form.Field name="bio">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional bio{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder="Share your background, areas of interest and patient care philosophy..."
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                    maxLength={1000}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <FieldDescription>
                      Shown on  your public profile after approval.
                    </FieldDescription>
                    <span className="text-xs text-muted-foreground">
                      {field.state.value.length}/1000
                    </span>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}

                </Field>
              );
            }}
          </form.Field>

          <form.Field name="resume">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="resume-field"> Resume </FieldLabel>
                  <div>
                    <label
                      htmlFor="resume-field"
                      className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <FileUp size="20" />
                      Upload Resume
                    </label>

                    <input
                      id="resume-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null

                        // if (selected && (
                        //   !isAcceptedFileSize(selected.size) ||
                        //   !isAcceptedFileType(selected?.type))
                        // ) {
                        //   field.handleBlur();
                        //   return;
                        // }
                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary" />
                        <span className="truncate"> {file.name} </span>
                        <span className="text-xs text-muted-foreground ">
                          {formatFileSize(file.size)}
                        </span>
                        <Button
                          type="button"
                          aria-label="Remove resume"
                          onClick={() => field.handleChange(null)}
                          className="text-muted-foreground transition-colors hover:text-sestructive focus:outline-none">
                          <X className="size-4 text-white" />
                        </Button>
                      </span>)
                      : (
                        <span className="text-xs text-muted-foreground">
                          PDF, DOC, DOCX or image up to {MAX_FILE_SIZE} MB
                        </span>
                      )
                    }

                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="  additional-files-field"> Additional Files 
                     <span className="font-normal text-muted-foreground"> 
                        (optional)
                      </span>
                     </FieldLabel>

                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="additional-file-field"
                      className="inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
                    >
                      <Plus className="size-4" />
                      Add Files
                    </label>

                    <input
                      id="additional-file-field"
                      type="file"
                      multiple
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);

                        if (incoming.length === 0) {
                          return
                        }

                        // const invalid = incoming.some((file) =>
                        //   !isAcceptedFileSize(file.size) ||
                        //   !isAcceptedFileType(file.type),
                        // );

                        // if (invalid) {
                        //   field.handleBlur();
                        //   e.target.value = "";
                        //   return
                        // }

                        field.handleChange([...files, ...incoming])
                        e.target.value = "";

                      }}
                    />
                    {files.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {files.length} of {MAX_ADDITIONAL_FILES} added
                      </span>
                    )}
                  </div>

                  {files.length > 0 && (
                    <ul className=" flex flex-col gap-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <FileText className=" size-4 shrink-0 text-primary" />
                            <span className="truncate"> {file.name} </span>
                            <span className="text-sx text-muted-foreground ">
                              {formatFileSize(file.size)}
                            </span>
                          </span>

                          <button
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            onClick={() => {
                              field.handleChange(
                                files.filter((_, i) => i !== index),
                              );
                              field.handleBlur();
                            }}
                            className="text-muted-foreground transition-colors hover:text-destructive "
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}

                    </ul>
                  )}

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

        </FieldGroup>

        <div className="flex justify-end w-full mt-5">
          <Button type="submit" size="lg">
            Submit Application
          </Button>
        </div>

      </form>

      <p className="text-xs leading-relaxed text-muted-foreground ">
        Already an approved doctor?{" "}
        <Link href="/login" className="font-medium underline underline-offset-4 hover:text-primary">
          Sign in to the Doctor Portal
        </Link>
        {" "}or if you're a patient, use the{" "}
        <Link href="/register" className="font-medium underline underline-offset-4 hover:text-primary">
          patient registration
        </Link>{" "}
        form instead.
      </p>

    </div>
  );
}