import axiosInstance from "./axiosInstance";

interface LoginBody {
    email: string;
    password: string;
}

interface LoginResponse {
    email: string;
    name: string;
    authToken: string;
}

export async function login(body: LoginBody): Promise<LoginResponse> {
    const res = await axiosInstance.post<{ data: LoginResponse }>("/api/login", body);
    return res.data.data;
}