import { useEffect, useState } from "react";

type Error = {
  status: number;
  message: string;
};

type DataState<T> = {
  status: "ready" | "pending" | "done" | "error";
  data: T | null;
  error?: Error;
};

export default function useFetchState<T>(func: () => Promise<T>) {
  const [dataState, setDataState] = useState<DataState<T>>({
    status: "ready",
    data: null
  });

  useEffect(() => {
    const update = async () => {
      setDataState({ status: "pending", data: null });
      try {
        const result = await func();
        setDataState({ status: "done", data: result });
      } catch (e) {
        setDataState({ status: "error", data: null, error: e as Error });
      }
    };

    update();
  }, [func]);

  return dataState;
}
