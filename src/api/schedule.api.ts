import apiClient from "@/lib/apiclient";
import { ApiResponse } from "@/types";
import { CreateSchedulePayload, Schedule, ScheduleParams } from "@/types/schedule.type";



export function createSchedule(payload: CreateSchedulePayload) {
    return apiClient<ApiResponse<Schedule>>("/api/v1/schedule/create-schedules", {
        method: "POST",
        body: payload,
    });
}

export function getMySchedules(params: ScheduleParams) {
    return apiClient<ApiResponse<Schedule[]>>("/api/v1/schedule/my-schedules" ,{
        params,
    });
}

export function publishSchedule(scheduleId: string) {
    return apiClient<ApiResponse<Schedule>>(
        `/api/v1/schedule/publish-schedule/${scheduleId}`,
        {method: "PATCH"}
    );
}

export function deleteSchedule(scheduleId: string) {
    return apiClient<ApiResponse<Schedule>>(`/api/v1/schedule/${scheduleId}`, {
     method: "DELETE",
    });
}