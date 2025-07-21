import { useEffect, useState } from 'react';
type Props<T> = {
  fetcher: () => Promise<T>;
  initValue: T;
  deps: any[]; // 의존성 배열
};
export const useFetch = <T>({ fetcher, initValue, deps }: Props<T>) => {
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

    return () => {};
  }, deps);

  return { data, isLoading, error };
};
