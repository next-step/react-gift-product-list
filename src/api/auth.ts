import apiClient from "@/api/apiClient";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  name: string;
  authToken: string;
};

export const login = (payload: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post("/login", payload);
};
