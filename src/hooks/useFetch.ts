import { useEffect, useState } from 'react';
type Props = {
  fetcher: () => Promise<any>;
  initValue: any;
};
export const useFetch = <T>({ fetcher, initValue }: Props<T>) => {
  const [data, setData] = useState<T>(initValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetcher(); // fetcher()는 이미 Promise<T>를 리턴

        setData(result); // 여기서 result는 이미 data야
      } catch (err) {
        setError(err);
        setData(initValue);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, [fetcher]);

  return { data, isLoading, error };
};
