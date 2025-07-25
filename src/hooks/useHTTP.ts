import { useState, useEffect } from 'react';

interface UseHTTPProps<T, U> {
  apiFunction: (args?: T) => Promise<U>;
  sendOnMount?: boolean;
  args?: T;
}

const useHTTP = <T, U>({ apiFunction, sendOnMount = true, args }: UseHTTPProps<T, U>) => {
  const [data, setData] = useState<U | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!sendOnMount) return;

    const fetchData = async () => {
      setIsPending(true);
      setError(null);
      try {
        const result = await apiFunction(args);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [apiFunction, sendOnMount, args]);

  return { data, isPending, error };
};

export default useHTTP;