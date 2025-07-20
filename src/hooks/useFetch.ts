import type { ErrorData } from "@/types/FetchErrorData";
import axios, { AxiosHeaders, type Method } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseFetchOptions<TBody> {
  method?: Method;
  params?: Record<string, string | number>;
  autoFetch?: boolean;
  dependency?: React.DependencyList;
  headers?: AxiosHeaders;
  body?: TBody;
  baseUrl?: string;
}
interface UseFetchResponse<T> {
  data: T;
}
interface UseFetchResponseData<T> {
  data: T | null;
  error: ErrorData | undefined;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = <TResponse, TBody = unknown>(
  url: string,
  {
    method = "GET",
    params = undefined,
    autoFetch = true,
    dependency = [],
    headers = undefined,
    body = undefined,
    baseUrl = "",
  }: UseFetchOptions<TBody> = {},
) => {
  const options = useMemo(
    () => ({
      method,
      params,
      headers,
      body,
      baseUrl,
      dependency,
    }),
    [
      method,
      JSON.stringify(params),
      JSON.stringify(headers),
      JSON.stringify(body),
      baseUrl,
      JSON.stringify(dependency),
    ],
  );

  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState<ErrorData | undefined>(undefined);
  const [data, setData] = useState<TResponse | null>(null);

  const fetchData = useCallback(
    async (
      fetchHeaders: typeof headers = options.headers,
      fetchBody: typeof body = options.body,
      fetchParams: typeof params = options.params,
    ): Promise<UseFetchResponseData<TResponse>> => {
      const base = options.baseUrl ? options.baseUrl : BASE_URL;
      const fetchUrl = new URL(url, base);

      if (fetchParams) {
        for (const [name, value] of Object.entries(fetchParams)) {
          fetchUrl.searchParams.append(name, String(value));
        }
      }

      try {
        setIsLoading(true);
        const response = await axios<UseFetchResponse<TResponse>>(fetchUrl.toString(), {
          method: options.method,
          headers: fetchHeaders,
          data: fetchBody,
        });
        setError(undefined);
        setData(response.data.data);
        return { data: response.data.data, error: undefined };
      } catch (error) {
        console.error("Error fetching themes data:", error);
        if (axios.isAxiosError<UseFetchResponse<ErrorData>>(error)) {
          setData(null);
          setError(error.response?.data.data);
          return { data: null, error: error.response?.data.data };
        }
        return { data: null, error: undefined };
      } finally {
        setIsLoading(false);
      }
    },
    [url, options],
  );

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch, ...options.dependency]);

  return { isLoading, error, data, fetchData };
};

export default useFetch;
