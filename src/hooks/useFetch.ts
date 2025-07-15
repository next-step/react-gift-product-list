import { useEffect, useState } from "react";
import { get } from "@/services/request";

export function useFetch<T>(url: string, queryParams?: any) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await get<{ data: T }>(url, { queryParams });
        setData(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(queryParams)]);

  return { data, loading, error };
}
