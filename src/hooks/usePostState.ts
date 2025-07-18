import { useState, useCallback } from "react";

type Error = {
  status: number;
  message: string;
};

type DataState<T> = {
  status: "ready" | "pending" | "done" | "error";
  result: T | null;
  error?: Error;
};

export default function usePostState<T, A extends unknown[]>(
  func: (...args: A) => Promise<T>
) {
  const [dataState, setDataState] = useState<DataState<T>>({
    status: "ready",
    result: null
  });

  const post = useCallback(
    async (...args: A) => {
      setDataState({ status: "pending", result: null });

      try {
        const result = await func(...args);
        setDataState({ status: "done", result: result });
      } catch (e) {
        setDataState({
          status: "error",
          result: null,
          error: e as Error
        });
      }
    },
    [func]
  );

  return { ...dataState, post };
}
