import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string | number>;
  autoFetch?: boolean;
  dependency?: React.DependencyList;
  data?: Object;
  baseUrl?: boolean;
}
interface ErrorData {
  data: {
    status: string;
    statusCode: number;
    message: string;
  };
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const defaultOptions: UseFetchOptions = {
  method: "GET",
  params: {},
  autoFetch: true,
  dependency: [],
  data: {},
  baseUrl: true,
};

const useFetch = <T>(url: string, options: UseFetchOptions = defaultOptions) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const [isLoading, setIsLoading] = useState<boolean>(mergedOptions.autoFetch ? true : false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async (): Promise<{ data: T | null; error: ErrorData | undefined }> => {
    const base = mergedOptions.baseUrl ? BASE_URL : undefined;
    const fetchUrl = new URL(url, base);

    if (mergedOptions.params) {
      for (const [name, value] of Object.entries(mergedOptions.params)) {
        fetchUrl.searchParams.append(name, String(value));
      }
    }

    try {
      setIsLoading(true);
      const response = await axios<T>(fetchUrl.href, { method: mergedOptions.method, data: mergedOptions.data });
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
  }, [url, mergedOptions.baseUrl, JSON.stringify(mergedOptions)]);

  useEffect(() => {
    if (mergedOptions.autoFetch) {
      fetchData();
    }
  }, [fetchData, mergedOptions.autoFetch, JSON.stringify(mergedOptions.dependency)]);

  return { isLoading, isError, data, fetchData };
};

export default useFetch;
