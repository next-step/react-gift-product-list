import type { LoginRequest, LoginResponse, ApiResponse } from "@/types/api";
import { api } from "./core";


export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post<ApiResponse<LoginResponse>>("/login", loginData);
        return response.data.data;
    } catch (error) {
        throw error;
    }
}
