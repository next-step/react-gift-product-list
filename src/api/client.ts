export interface FetchApiOptions {
  method?: string
  params?: Record<string, string>
  body?: unknown
  headers?: Record<string, string>
}

export async function fetchApi<T>(
  url: string,
  optionsOrParams?: FetchApiOptions | Record<string, string>,
): Promise<T> {
   let options: FetchApiOptions

  if (
    optionsOrParams &&
    !('method' in optionsOrParams) &&
    !('body' in optionsOrParams) &&
    !('headers' in optionsOrParams) &&
    !('params' in optionsOrParams)
  ) {
    options = { params: optionsOrParams as Record<string, string> }
  } else {
    options = (optionsOrParams as FetchApiOptions) || {}
  }

  const { method = 'GET', params, body, headers } = options

  const query = params ? `?${new URLSearchParams(params).toString()}` : ''
 const res = await fetch(`${url}${query}`, {
    method,
    headers: body
      ? { 'Content-Type': 'application/json', ...headers }
      : headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()

  if (!res.ok || json.data === undefined) {
    const message = json?.data?.message || `Invalid response from ${url}`
    const error = new Error(message)
    ;(error as any).statusCode = json?.data?.statusCode || res.status
    throw error  }

  return json.data as T
}