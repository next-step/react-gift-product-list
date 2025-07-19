export interface LoginResponse {
  data: {
    email: string;
    name: string;
    authToken: string;
  };
}
