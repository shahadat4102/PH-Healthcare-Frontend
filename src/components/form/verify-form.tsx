
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";
import { toast } from "../ui/toast";


const RESEND_COOLDOWN = 120;

export default function VerifyForm({mode = "patient",} : {mode: "doctor" | "patient"}) {
  const router = useRouter();
  const searchParmas = useSearchParams();
  const [otp, setotp] = useState("");
  const [isInvalid, setisInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { mutate: VerifyPatient } = useVerifyAccount()
  const {mutate: verifyDoctor} = useVerifyDoctorAccount();

  const verify = mode === "doctor" ? verifyDoctor : VerifyPatient;

  const email = searchParmas.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [router, email])

  useEffect(() => {
    if (resendTimer <= 0) {
      return
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);
  

  const handelOTP = () => {
    if (otp.length !== 6) {
      setisInvalid(true)
      return
    }
    const verifyData = {
      email,
      otp
    }

    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "somthing went wrong. please try agin",
            type: "error"
          })

        }

        if(mode === "doctor") {
            toast.add({
          title: "Verification Successfully",
          description: "An admin will approve your account. This mat take time. Please check your email in few days",
          type: "success"
        });
        router.push("/")
        return;
        }

        toast.add({
          title: "Verification Successfully",
          description: "welcom onborad",
          type: "success"
        })

        router.push("/")
      },
      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description: err.message || "somthing went wrong. please try agin",
          type: "error"
        })
      }
    })


  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Verify Account </CardTitle>
        <CardDescription>
          Please provide the OTP We send you in your email
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handelOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setotp(value);
                if (isInvalid) {
                  setisInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {
              isInvalid && <FieldError errors={[{ message: "Invalid code. please try again" }]} />
            }
          </Field>

        </form>
      </CardContent>

      <CardFooter>
        <Button>Resend</Button>
        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>

    </Card>
  )
}