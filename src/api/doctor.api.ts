import { ApproveDoctorPayloat, DoctorParams, DoctorVerificationStatus, PublicDoctorParams, PublicDoctorProfile } from './../types/doctor.type';

import apiClient from "@/lib/apiclient";
import { ApiResponse, VerifyAccountPayload } from "@/types";
import { Doctor, DoctorApplicationPayload } from "@/types/doctor.type";
import { Schedule } from "@/types/schedule.type";



export function applyAsDoctor(payload: DoctorApplicationPayload) {
    const formData = new FormData();

    formData.append("data", JSON.stringify(payload.data));
    formData.append("resume", payload.resume);

    for (const file of payload.additionalFiles) {
        formData.append("additionalFiles", file);
    }

    return apiClient("/api/v1/doctor/apply-as-doctor", {
        method: "POST",
        body: formData,
    });
}

export function verifyDoctoAccount(payload: VerifyAccountPayload) {
    console.log("Verify doctor API called with:", payload);
    console.log("Endpoint:", "/api/v1/doctor/apply-as-doctor/verify-email");
    return apiClient("/api/v1/doctor/apply-as-doctor/verify-email", {
        method: "POST",
        body: payload,
    });
}


export function getAllDoctor(params: DoctorParams) {
    return apiClient<ApiResponse<Doctor[]>>("/api/v1/doctor/all-doctors", {
      params,
    });
}

export function GetAllPublicDoctors(params: PublicDoctorParams) {
    return apiClient<ApiResponse<PublicDoctorProfile[]>>(
        "/api/v1/doctor/public/all-doctor", {
            params,
        },
    );
}

export function getPublicDoctorProfile(doctorId: string) {
    return apiClient<ApiResponse<PublicDoctorProfile>>(
        `/api/v1/doctor/public/${doctorId}`
    );
}


export function approveDoctor(payloat: ApproveDoctorPayloat) {
    return apiClient("/api/v1/doctor/approve-doctor", {
        method: "POST",
        body: payloat,
    })
}

export function getTodayScheduleByDoctor(params: {
    doctorId?: string;
    page?: number;
    limit?: number;
}) {
    return apiClient<ApiResponse<Schedule[]>>("/api/v1/doctor/public/available-today", {
        params,
    })
}
