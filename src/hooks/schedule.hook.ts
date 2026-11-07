
import { QueryClient } from '@tanstack/react-query';
import { createSchedule, deleteSchedule, getMySchedules, publishSchedule } from '@/api/schedule.api';
import { ScheduleParams } from '@/types/schedule.type';
import {  useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';


export function useCreateSchedule() {
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: createSchedule,
        onSuccess: () => {
         QueryClient.invalidateQueries({queryKey: ["schedules"] });  
        }
    });
}

export function useMySchedules(params: ScheduleParams) {
    return useQuery({
        queryKey: ["schedules", params],
        queryFn: () => getMySchedules(params),
    });
}


export function useSuspenseMySchedules(params: ScheduleParams) {
    return useSuspenseQuery({
        queryKey: ["schedules", params],
        queryFn: () => getMySchedules(params),
    });
}

export function usePublishSchedule() {
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: publishSchedule,
        onSuccess: () => {
            QueryClient.invalidateQueries({queryKey: ["schedules"]});
        },
    });
}

export function useDeleteSchedule() {
    const QueryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSchedule,
        onSuccess: () => {
            QueryClient.invalidateQueries({ queryKey:  ["schedules"]});
        },
    });
}
