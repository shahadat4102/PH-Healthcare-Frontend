import { getMe, googleAuth, userLogin, userLogut, userRegister, verifyaccount } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";


export function useLogin() {
    return useMutation({
        mutationFn: userLogin,
    })
}

export function useVerifyAccount() {
    return useMutation({
        mutationFn: verifyaccount,
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: userRegister
    })
}

export function useLogout() {
    return useMutation({
        mutationFn: userLogut
    })
}

export function useGoogleAuth() {
    return useMutation({
        mutationFn: googleAuth
    })
}


export function useGetNe() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false
    });
}