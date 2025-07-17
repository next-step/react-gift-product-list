// * 로그인 인증 관련 타입

// * 로그인 요청
export interface LoginRequest {
  email: string
  password: string
}

// * 로그인 응답
export interface LoginResponse {
  email: string
  name: string
  authToken: string
}
