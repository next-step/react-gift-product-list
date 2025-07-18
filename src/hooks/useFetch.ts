import axios from 'axios';
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
        console.log('가져오기 시작');
        const result = await fetcher(); // fetcher()는 이미 Promise<T>를 리턴
        console.log('가져온 후 저장');
        setData(result); // 여기서 result는 이미 data야
      } catch (e) {
        let errorInfo: ErrorInfo = { message: '알 수 없는 오류 발생' };

        //axios 에서 발생한 에러이면 response 객체에 안전하게 접근이 가능하다.
        if (axios.isAxiosError(e)) {
          console.log('에러 안이 어떻게 생겼나 보자', e);
          errorInfo = {
            message: e.response?.data?.data.message || '요청 오류가 발생했어요.',
            status: e.response?.data.data.status,
            statusCode: e.response?.data.data.statusCode,

          };
          if (errorInfo.statusCode && errorInfo.statusCode >= 400 && errorInfo.statusCode < 500) {
            alert(`⚠️ ${errorInfo.message}`); //토스티파이 !!
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
  }, [fetcher]);

  return { data, isLoading, error };
};
