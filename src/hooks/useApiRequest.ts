import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

type Status = "idle" | "loading" | "success" | "error";

interface RequestConfig extends AxiosRequestConfig {
  url: string;
}

export function useApiRequest<T>({ url, ...config }: RequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await axios.get<{ data: T }>(
          import.meta.env.VITE_API_BASE_URL + url,
          config
        );
        if (isMounted) {
          setData(res.data.data);
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
  }, [url, JSON.stringify(config.params)]);

  return { data, status, error };
}
