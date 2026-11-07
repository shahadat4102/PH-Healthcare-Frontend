

"use client"
import { useForm } from "@tanstack/react-form"
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import Link from "next/link";
import GoogleLoginComponet from "../modules/google-login/googlelogin";
import { patientRegisterSchema } from "@/validation";
import z from "zod";
import { useRegister } from "@/hooks";
import { toast } from "../ui/toast";


 




export default function RegisterForm() {

   
    const router = useRouter();
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    
 type PatientDefaultValues = z.infer<typeof patientRegisterSchema>
 const defaultValues : PatientDefaultValues = {
            name: "",
            email: "",
            contactNumber: "",
            password: "",
            confirmPassword: ""
        }


    const {mutate: register} = useRegister()    

    const form = useForm({
        defaultValues,
       validators: {
        onSubmit: patientRegisterSchema
       },
     onSubmit: async ({value}) => {
        const registrationData = {
            name: value.name,
            email: value.email,
            password: value.password,
            patient: {
                contactNumber: value.contactNumber,
            },
          };
      register (registrationData, {
          onSuccess: (res) => {
            if(!res.success){
              toast.add({
              title: "Server Failure",
              description:"somthing went wrong. please try agin",
              type: "error"
            })
            return; // ✅ return statement
         }

            toast.add({
            title: "Registration Successfully",
            description: "Please verify your account",
            type: "success" 
         })
         const params = new URLSearchParams({email: registrationData.email})
            router.push(`/account-verify?${params.toString()}`)
          },
          onError: (err) => {
           toast.add({
            title: "Authorization failure",
            description: err.message ||  "somthing went wrong. please try agin",
            type: "error"
         })
       }
    })

  },
}) 


    return (
        <div className=" flex flex-col gap-6">
            <div className=" flex flex-col items-center  gap-2 text-center"> 
               <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
               <p className="text-balance text-sm text-muted-foreground">Enter Your details below create your account </p>
            </div>
            
            <form onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            >
              <FieldGroup> 

              <form.Field name="name">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
                    return(
                    <Field data-invalid={isInvalid}> 
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <div className="relative">
                        <Input 
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="John Doe"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        aria-invalid={isInvalid}
                        autoComplete="name"
                         />
                      </div>
                      {isInvalid && <FieldError errors={field.state.meta.errors}/>}
                    </Field>
                    );
                  }}
              </form.Field>

                <form.Field name="email">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
                    return(
                    <Field data-invalid={isInvalid}> 
                       <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                       <div className="relative"> 
                        <Input 
                        id={field.name}
                        name={field.name}
                        type={"email"}
                        placeholder="m@example.com"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                         />
                      </div>
              
                      {isInvalid && <FieldError errors={field.state.meta.errors}/>}
                    </Field>
                    );
                  }}
              </form.Field>

                <form.Field name="contactNumber">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
                    return(
                    <Field data-invalid={isInvalid}> 
                       <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                       <div className="relative"> 
                        <Input 
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+8801965124102"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        autoComplete="off"
                        aria-invalid={isInvalid}
                         />
                      </div>
              
                      {isInvalid && <FieldError errors={field.state.meta.errors}/>}
                    </Field>
                    );
                  }}
              </form.Field>

               <form.Field name="password">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
                    return(
                    <Field data-invalid={isInvalid}> 
                       <FieldLabel htmlFor={field.name}>password</FieldLabel>
                       <div className="relative"> 
                        <Input 
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        autoComplete="off"
                        className="pr-10"
                        aria-invalid={isInvalid}
                         />
               <button 
                 type="button"
                  onClick={() => setshowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                 aria-label={
                 showPassword ? "Hide password" : "Show password"
                }
                >

                {
                  showPassword ? (<EyeOff className="size-4"/> ) : (<Eye className="size-4"/>)
                }
                       
              </button>

            </div>
              
                  {isInvalid && <FieldError errors={field.state.meta.errors}/>}
                 </Field>
                  );
              }}
              </form.Field>
             
                  <form.Field name="confirmPassword">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && ! field.state.meta.isValid
                    return(
                    <Field data-invalid={isInvalid}> 
                       <FieldLabel htmlFor={field.name}>ConfirmPassword</FieldLabel>
                       <div className="relative"> 
                        <Input 
                        id={field.name}
                        name={field.name}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="*********"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        autoComplete="off"
                        className="pr-10"
                        aria-invalid={isInvalid}
                         />
               <button 
                 type="button"
                  onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                 aria-label={
                 showConfirmPassword ? "Hide password" : "Show password"
                }
                >

                {
                  showConfirmPassword ? (<EyeOff className="size-4"/> ) : (<Eye className="size-4"/>)
                }
                       
              </button>

            </div>
              
                  {isInvalid && <FieldError errors={field.state.meta.errors}/>}
                 </Field>
                  );
              }}
              </form.Field>

               
          <Button type="submit"> Submit </Button>
     
           </FieldGroup>  
            </form>

            <FieldSeparator>or continue with</FieldSeparator>

              <GoogleLoginComponet/>

            <div className="text-center text-ms text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >

                Login
                
              </Link>
          </div>

        </div>
    )
}