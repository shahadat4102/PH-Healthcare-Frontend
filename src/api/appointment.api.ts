import apiClient from "@/lib/apiclient";
import { ApiResponse } from "@/types";
import { BookAppointmentPayload, BookAppointmentResponse } from "@/types/appointment.type";


export function bookAppointment(payload: BookAppointmentPayload) {
    return apiClient<ApiResponse<BookAppointmentResponse>>(
        "/api/v1/appointment/book-appointment",
        {
            method: "POST",
            body: payload,
        },
    )
}

export function getMyAppointments(params: {page?: number; limit?: number}) {
    return apiClient("api/v1/appointment/my-appointments", {
        params,
    });
}