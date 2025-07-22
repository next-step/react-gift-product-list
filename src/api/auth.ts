import { fetchApi } from './client'

export async function postLogin(
  email: string,
  password: string,
): Promise<UserInfo> {
  const data = await fetchApi<UserInfo>('/api/login', {
    method: 'POST',
    body: { email, password },
  })

  const { email: userEmail, name, authToken } = data

  if (
    typeof userEmail !== 'string' ||
    typeof name !== 'string' ||
    typeof authToken !== 'string'
  ) {
       throw new Error('Invalid response from /api/login')
  }

  return { email: userEmail, name, authToken }
}