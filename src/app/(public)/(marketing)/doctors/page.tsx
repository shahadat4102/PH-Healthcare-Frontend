import DoctorList from "@/components/modules/doctors/doctor-list";


export default function page() {
    return (
        <section className="max-w-11/12 mx-auto  px-4 py-8">
        <div className="mb-6">
            <h1 className="text-2xl font-semibold"> Our Doctors </h1>
            <p className="text-muted-foreground">
                Growse verified doctors and find the right specialist for you.
            </p>
        </div>
            <DoctorList/>
       </section>
    )
}