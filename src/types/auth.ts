export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  email: string;
  name: string;
  authToken: string;
}

export interface LoginResponse {
  data: UserInfo;
}
