import { useCallback, useEffect, useState } from "react";

type UseApiRequestProps<TData, TArgs extends unknown[] = []> = {
  requestFn: (...args: TArgs) => Promise<TData>;
  immediate?: boolean;
};

const useApiRequest = <TData = unknown, TArgs extends unknown[] = []>({
  requestFn,
  immediate = true,
}: UseApiRequestProps<TData, TArgs>) => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(immediate);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    (...args: TArgs) => {
      setIsLoading(true);
      setIsError(false);
      requestFn(...args)
        .then(response => {
          setData(response);
        })
        .catch(err => {
          setIsError(true);
          setError(err.errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [requestFn],
  );

  useEffect(() => {
    if (immediate) {
      fetchData(...([] as unknown as TArgs));
    }
  }, [immediate, fetchData, requestFn]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchData,
  };
};

export default useApiRequest;
