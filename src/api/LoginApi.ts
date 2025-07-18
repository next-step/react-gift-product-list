export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  authToken: string;
  email: string;
  name: string;
}

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const contentType = res.headers.get('Content-Type');

  if (!res.ok) {
    let message = '로그인 실패';
    if (contentType && contentType.includes('application/json')) {
      const errorBody = await res.json();
      message = errorBody.message || message;
    }

    throw new Error(message);
  }

  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('서버 응답이 JSON이 아닙니다.');
  }

  const json = await res.json();
  return json.data;
}
