//로그인 용 api 함수
import { client } from './client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  authToken: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await client.post('/api/login', data);
  return response.data.data;
};
