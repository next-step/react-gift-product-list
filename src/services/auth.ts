import baseHttp from "./baseHttp";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  authToken: string; // 사용자가 로그인 성공하면 서버가 응답으로 줌
  email: string;
  name: string;
};

export const auth = async (body: LoginRequest): Promise<LoginResponse> => {
  const response = await baseHttp.post<LoginResponse>("/login", body);
  return response.data;
};
