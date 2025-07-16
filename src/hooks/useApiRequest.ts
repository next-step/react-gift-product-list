import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

type Status = "idle" | "loading" | "success" | "error";

interface RequestConfig<T = any> extends AxiosRequestConfig {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: T;
}

export function useApiRequest<T>({
  url,
  method = "get",
  data,
  ...config
}: RequestConfig) {
  const [response, setResponse] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await axios.request<{ data: T }>({
          url: import.meta.env.VITE_API_BASE_URL + url,
          method,
          data,
          ...config,
        });
        if (isMounted) {
          setResponse(res.data.data);
          setStatus("success");
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message ?? "에러 발생");
          setStatus("error");
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url, method, JSON.stringify(config.params), JSON.stringify(data)]);

  return { data: response, status, error };
}
