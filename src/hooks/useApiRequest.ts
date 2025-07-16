import { useCallback, useEffect, useState } from "react";

type UseApiRequestProps<TData> = {
  requestFn: () => Promise<TData>;
  immediate?: boolean;
};

const useApiRequest = <TData = unknown>({
  requestFn,
  immediate = true,
}: UseApiRequestProps<TData>) => {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setIsError(false);
    requestFn()
      .then(response => {
        setData(response);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestFn]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return {
    data,
    isLoading,
    isError,
    refetch: fetchData,
  };
};

export default useApiRequest;
