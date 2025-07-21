import { ROUTE_PATH } from "@/routes/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type UseApiRequestProps<TData, TArgs extends unknown[] = []> = {
  requestFn: (...args: TArgs) => Promise<TData>;
  immediate?: boolean;
};

const useApiRequest = <TData = unknown, TArgs extends unknown[] = []>({
  requestFn,
  immediate = true,
}: UseApiRequestProps<TData, TArgs>) => {
  const navigate = useNavigate();
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(immediate);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(
    (...args: TArgs) => {
      setIsLoading(true);
      setIsError(false);
      requestFn(...args)
        .then(response => {
          setData(response);
        })
        .catch(error => {
          setIsError(true);
          if (error.response?.status === 401) {
            navigate(ROUTE_PATH.LOGIN, { replace: true });
          } else if (error.response?.status === 404) {
            navigate(ROUTE_PATH.HOME, { replace: true });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [requestFn, navigate],
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
    refetch: fetchData,
  };
};

export default useApiRequest;
