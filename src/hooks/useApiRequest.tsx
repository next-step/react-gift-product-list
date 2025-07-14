import { useEffect, useState } from "react";
import axios from "axios";

type Status = "idle" | "loading" | "success" | "error";

export function useApiRequest<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await axios.get<{ data: T }>(
          import.meta.env.VITE_API_BASE_URL + endpoint
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
  }, [endpoint]);

  return { data, status, error };
}
