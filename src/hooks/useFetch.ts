import axios from 'axios';
import { useEffect, useState } from 'react';
import type { ErrorInfo } from '@/types/error';
type Props<T> = {
  fetcher: () => Promise<T>;
  initValue: T;
  deps: []; // 의존성 배열
};
export const useFetch = <T>({ fetcher, initValue, deps }: Props<T>) => {
  const [data, setData] = useState<T>(initValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorInfo|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetcher();
        setData(result); 
      } catch (e) {
        let errorInfo: ErrorInfo= { message: '알 수 없는 오류 발생' };


        //axios 에서 발생한 에러이면 response 객체에 안전하게 접근이 가능하다.
        if (axios.isAxiosError(e)) {
          errorInfo = {
            message: e.response?.data?.data.message || '요청 오류가 발생했어요.',
            status: e.response?.data.data.status,
            statusCode: e.response?.data.data.statusCode,

          };
          if (errorInfo.statusCode && errorInfo.statusCode >= 400 && errorInfo.statusCode < 500) {
            console.error(`${errorInfo.message}`); 
          }

          //일단 js 런타임 에러!  e.message는 Error 객체의 기본 메시지
        } else if (e instanceof Error) {
          errorInfo = { message: e.message };
        }
        setError(errorInfo);
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
