import axios from "axios";
import { useState } from "react";

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetch = <T>(
  initialValue: FetchState<T> = {
    isLoading: true,
    isError: false,
    data: null,
  },
) => {
  const [fetchState, setFetchState] = useState<FetchState<T>>(initialValue);

  const fetchData = async (url: string, baseUrl: boolean = true) => {
    const fetchUrl = baseUrl ? BASE_URL + url : url;
    try {
      const response = await axios.get<T>(fetchUrl);
      setFetchState({ isLoading: false, isError: false, data: response.data });
    } catch (error) {
      console.error("Error fetching themes data:", error);
      setFetchState({ isLoading: false, isError: true, data: null });
    }
  };

  return { fetchState, fetchData };
};

export default useFetch;
