import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export function useFetchData<T>(fetchFn: () => Promise<{ data: { data: T } }>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchFn();
        if (isMounted) {
          setData(response.data.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            const axiosErr = err as AxiosError<{ data?: { message?: string } }>;
            const message = axiosErr.response?.data?.data?.message;
            setError(message ?? "데이터를 가져오지 못했습니다.");
          } else {
            setError("에러가 발생했습니다.");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn]);

  return { data, loading, error };
}
