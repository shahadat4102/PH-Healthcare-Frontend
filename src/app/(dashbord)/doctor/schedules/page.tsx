import ScheduleList from "@/components/doctor-schedule/schedule-list";


export default function page() {
    return (
        <section className="p-5">
            <div>
                <h1 className="text-2xl font-bold">My Schedules</h1>
                <p>Create schdules, publish them for booking, or delete drafts </p>
            </div>
            <ScheduleList/>
        </section>
    )
}