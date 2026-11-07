import apiClient from "@/lib/apiclient";
import { LoginPayload, RegistationPayload, VerifyAccountPayload } from "@/types";

export function userLogin (payload: LoginPayload) {
    return apiClient("/api/v1/auth/login", {method: "POST", body: payload})
}

export function verifyaccount (payload: VerifyAccountPayload) {
    return apiClient("/api/v1/auth/verify-email", {method: "POST", body: payload})
}

export function userRegister (payload: RegistationPayload) {
    return apiClient("/api/v1/auth/register", {method: "POST", body: payload})
}

export function userLogut () {
    return apiClient("/api/v1/auth/logout", {method: "POST"});
}

export function getMe () {
    return apiClient("/api/v1/auth/me")
}

export function googleAuth (payload: {idToken: string}) {
    return apiClient("/api/v1/auth/google", {method: "POST", body: payload})
}