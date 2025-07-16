import axios from "axios";
import { useCallback, useState } from "react";

type FetchParams = Record<string, string | number>;

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = <T>() => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async (url: string, params?: FetchParams, baseUrl: boolean = true) => {
    const base = baseUrl ? BASE_URL : undefined;
    const fetchUrl = new URL(url, base);

    if (params) {
      for (const [name, value] of Object.entries(params)) {
        fetchUrl.searchParams.append(name, String(value));
      }
    }

    try {
      setIsLoading(true);
      const response = await axios.get<T>(fetchUrl.href);
      setIsError(false);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching themes data:", error);
      setIsError(true);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, isError, data, fetchData };
};

export default useFetch;
