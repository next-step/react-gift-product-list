import type { ErrorData } from "@/types/FetchErrorData";
import axios, { AxiosHeaders } from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string | number>;
  autoFetch?: boolean;
  dependency?: React.DependencyList;
  headers?: AxiosHeaders;
  body?: Object;
  baseUrl?: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = <T>(
  url: string,
  {
    method = "GET",
    params = undefined,
    autoFetch = true,
    dependency = undefined,
    headers = undefined,
    body = undefined,
    baseUrl = "",
  }: UseFetchOptions = {},
) => {
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(
    async (
      fetchHeaders: AxiosHeaders | undefined = headers,
      fetchBody: Object | undefined = body,
      fetchParams: typeof params = params,
    ): Promise<{ data: T | null; error: ErrorData | undefined }> => {
      const base = baseUrl ? baseUrl : BASE_URL;
      const fetchUrl = new URL(url, base);

      if (fetchParams) {
        for (const [name, value] of Object.entries(fetchParams)) {
          fetchUrl.searchParams.append(name, String(value));
        }
      }

      try {
        setIsLoading(true);
        const response = await axios<T>(fetchUrl.toString(), { method, headers: fetchHeaders, data: fetchBody });
        setIsError(false);
        setData(response.data);
        return { data: response.data, error: undefined };
      } catch (error) {
        console.error("Error fetching themes data:", error);
        setIsError(true);
        setData(null);
        if (axios.isAxiosError<ErrorData>(error)) {
          return { data: null, error: error.response?.data };
        }
        return { data: null, error: undefined };
      } finally {
        setIsLoading(false);
      }
    },
    [url, baseUrl, method, body, params],
  );

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch, ...(dependency || [])]);

  return { isLoading, isError, data, fetchData };
};

export default useFetch;
