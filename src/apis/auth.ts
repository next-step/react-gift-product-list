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
  try {
    const response = await axios.post<LoginResponse>('/api/login', payload);
    return response.data;
  } catch (error: any) {
    const customError = new Error('Login failed');
    if (error.response) {
      (customError as any).status = error.response.status;
      (customError as any).data = error.response.data;
    } else {
      (customError as any).status = 500;
      (customError as any).data = { message: 'Unknown error' };
    }
    throw customError;
  }
}
