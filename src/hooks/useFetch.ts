import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = <T>() => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async (url: string, baseUrl: boolean = true) => {
    const fetchUrl = baseUrl ? BASE_URL + url : url;
    try {
      const response = await axios.get<T>(fetchUrl);
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
