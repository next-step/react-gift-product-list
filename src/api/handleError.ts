import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const handleError = (error: AxiosError) => {
  if (!error.response) {
    toast.error('네트워크 연결을 확인해 주세요.');
    return;
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
      toast(data.data.message);
      break;
    case 500:
      toast('서버 내부 오류 (INTERNAL_SERVER_ERROR)');
      break;
    default:
      toast('알 수 없는 오류가 발생했습니다.');
      break;
  }
};
export default handleError;
