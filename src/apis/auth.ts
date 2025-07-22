import axios from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('/api/login', payload);
  return response.data;
}
