import axios from 'axios';
import { useOptimistic, useState } from 'react';

type Props = {
  fetcher: (body: any, token?: string) => Promise<any>;
};
export type ErrorInfo = {
  message: string;
  status?: string;
  statusCode?: number;
};

const usePost = ({ fetcher }: Props) => {
  //💚제네릭 표현 정리하기
  const [data, setData] = useState(null);
const [error, setError] = useState<ErrorInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // 왜 useEffect를 쓰지 않고 함수로 만들어서 반환하느냐
  // useFetch 에서는 마운트 시나 [] 안의 상태가 바뀔 때마다 자동으로 호출됨!
  // 하지만 post는 사용자가 버튼을 누르거나 할 때 실행되어야하고,

  const post = async (body: any, token?: string) => {
    setIsLoading(true);
    try {
      const res = await fetcher(body, token);
      setData(res);
      return res.data
    } catch (e) {

      let errorInfo:ErrorInfo = {message:"알 수 없는 오류 발생", }
    
      //axios 에서 발생한 에러이면 response 객체에 안전하게 접근이 가능하다. 
      if (axios.isAxiosError(e)){
        errorInfo= {
          message: e.response?.data?.data.message || '요청 오류가 발생했어요.',
        status: e.response?.data.data.status,
        statusCode: e.response?.data.data.statusCode
        }
        //일단 js 런타임 에러!  e.message는 Error 객체의 기본 메시지
      }else if (e instanceof Error){
      errorInfo = { message: e.message };
      }
    setError(errorInfo)
      throw errorInfo // 이걸 안 던지면 posr 함수 호출 한 쪽에서 에러가 난 줄 모름
      //이렇게 던져야지만 try catch로 잡을 수 있다!
    } finally {
      setIsLoading(false);
    }
  };  
  return { data, error, isLoading, post };
};
export default usePost;