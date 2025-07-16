import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = <T>() => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async (url: string, baseUrl: boolean = true) => {
    const fetchUrl = baseUrl ? new URL(url, BASE_URL) : new URL(url);
    try {
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
  };

  return { isLoading, isError, data, fetchData };
};

export default useFetch;
