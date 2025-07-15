import { useEffect, useMemo, useState } from "react";
import { get } from "@/services/request";

export function useFetch<T>(url: string, queryParams?: Record<string, string>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const queryKey = useMemo(() => JSON.stringify(queryParams), [queryParams]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await get<{ data: T }>(url, { queryParams });
        setData(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, queryKey]);

  return { data, loading, error };
}
