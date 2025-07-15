import baseHttp from './baseHttp'
import type { HttpMethod, HttpParamsType } from '@/types/http'

export async function request<T>(
  method: HttpMethod,
  url: string,
  paramsData?: HttpParamsType<T>
): Promise<T> {
  try {
    const { data } = await baseHttp.request<T>({
      method,
      url,
      data: paramsData?.body,
      params: paramsData?.queryParams,
      headers: {
        'Content-Type':
          paramsData?.body instanceof FormData
            ? 'multipart/form-data'
            : 'application/json',
      },
    })

    return data
  } catch (error) {
    throw error
  }
}

export function get<T>(url: string, paramsData?: { queryParams?: any }) {
  return baseHttp
    .get<T>(url, {
      params: paramsData?.queryParams,
    })
    .then((res) => res.data);
}