import { ofetch } from "ofetch";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const apiClient = ofetch.create({
    baseURL: BASE_URL,
    credentials: "include",
    async onResponseError({ response }) {
        // Extract error message from backend response
        const errorData = response._data;
        if (errorData?.message) {
            throw new Error(errorData.message);
        }
    }
})

export default apiClient;