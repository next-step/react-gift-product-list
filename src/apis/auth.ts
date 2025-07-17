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
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const resJson = await response.json();

  if (!response.ok) {
    const error = new Error('Login failed');
    (error as any).status = response.status;
    (error as any).data = resJson;
    throw error;
  }

  return resJson;
}
