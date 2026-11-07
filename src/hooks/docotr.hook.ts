import { applyAsDoctor, approveDoctor, getAllDoctor, GetAllPublicDoctors, getPublicDoctorProfile, getTodayScheduleByDoctor, verifyDoctoAccount } from "@/api/doctor.api";
import { DoctorParams } from "@/types";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";



export function useApplyAsDoctor() {
    return useMutation({
        mutationFn: applyAsDoctor
    });
}


export function useVerifyDoctorAccount() {
    return useMutation({
        mutationFn: verifyDoctoAccount
    })
}

export function useGetAllDoctors( params: DoctorParams) {
    return useQuery({
        queryKey: ["doctors", params],
        queryFn: () => getAllDoctor(params)
    });
}

export function useGetAllPublicDoctors(params: DoctorParams) {
    return useQuery({
        queryKey: ["doctor", "public", params],
        queryFn: () => GetAllPublicDoctors(params)
    })
}

export function useSuspenseGetPublicDoctors(params: DoctorParams) {
    return useSuspenseQuery({
        queryKey: ["doctor", "public", params],
        queryFn: () => GetAllPublicDoctors(params)
    })
}

export function usePublicDoctorProfile(doctorId: string) {
    return useQuery({
        queryKey: ["doctor", "public", doctorId],
        queryFn: () => getPublicDoctorProfile(doctorId),
        enabled: !!doctorId,
    });
}


export function useSuspenseGetAllDoctors( params: DoctorParams) {
    return useSuspenseQuery({
        queryKey: ["doctors", params],
        queryFn: () => getAllDoctor(params)
    });
}

export function useApproveDoctor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: approveDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
        }
    })
}


export function useGetTodaySchedulebyDoctor(params: {
    doctorId?: string;
    page?: number;
    limit?: number;

}) {
    return useQuery({
        queryKey: ["schedule", params],
        queryFn: () => getTodayScheduleByDoctor(params),

    });
}