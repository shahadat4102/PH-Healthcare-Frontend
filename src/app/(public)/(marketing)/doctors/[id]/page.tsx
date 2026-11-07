import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  ScrollText,
  Stethoscope,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { GetAllPublicDoctors, getPublicDoctorProfile } from "@/api/doctor.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DoctorBooking from "@/components/modules/doctors/doctor-booking";

export async function generateStaticParams() {
  const limit = 100;
  const first = await GetAllPublicDoctors({ page: 1, limit });

  const totalPage = first.meta.totalPages ?? 1;

  const all = [...first.data];
  for (let page = 2; page <= totalPage; page++) {
    const data = await GetAllPublicDoctors({ page, limit });
    all.push(...data.data);
  }

  return all.map((doctor) => ({ id: doctor.id }));
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPublicDoctorProfile(id);
  const doctor = data.data || undefined;

  // Debug: Check if bio exists
  console.log("Doctor bio:", doctor?.bio);

  if (!doctor) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-muted-foreground">No doctor found with this ID</p>
        <Button className="mt-4 " render={<Link href="/doctors" />}>
          Back to Doctors
        </Button>
      </div>
    );
  }

  return (
    <div className=" mx-auto py-8 px-4 max-w-2xl">
      {/* Back Button */}
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 font-semibold  mb-6"
      >
        <ArrowLeft className="size-2" />
        Back to doctors
      </Link>

      {/* Doctor Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl"> {doctor.name} </CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <Stethoscope className="size-4" />
            {doctor.specialization}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p className="flex items-center gap-2">
            <GraduationCap className="size-4 shrink-0" />
            {doctor.qualifications}
          </p>
          <p className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4 shrink-0" />
            {doctor.experienceYears}{" "}
            {doctor.experienceYears === 1 ? "year" : "years"} of experience
          </p>
          <p className="flex items-center gap-2">
            <ScrollText className="size-4 shrink-0" />
            License No: {doctor.licenseNumber}
          </p>
          {doctor.consultationFee != null && (
            <p className="flex items-center gap-2">
              <Wallet className="size-4 shrink-0" />
              Consultation fee: ৳{doctor.consultationFee}
            </p>
          )}
          {doctor.bio && (
            <div className="pt-2">
              <p className="font-medium text-foreground">About</p>
              <p className="whitespace-pre-wrap"> {doctor.bio} </p>
            </div>
          )}

          {/* Debug: Always show to check if component renders */}
          {!doctor.bio && (
            <div className="pt-2">
              <p className="font-medium text-foreground">About</p>
              <p className="text-muted-foreground italic">
                {" "}
                My life, my rules.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Book appointment</h2>
          <p className="text-sm text-muted-foreground">
            Today&apos;s available slots. Bookin redirects to bkash payment.
          </p>
        </div>
         <DoctorBooking doctorId={doctor.id}/>
      </div>
    </div>
  );
}
