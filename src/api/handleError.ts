import axios from 'axios';
import { toast } from 'react-toastify';

interface ErrorBody {
  data: { message: string; status: string; statusCode: number };
}

const handleError = (error: unknown) => {
  if (!axios.isAxiosError<ErrorBody>(error)) {
    toast('네트워크 오류가 발생했습니다.');
    return;
  }
  const status = error.response?.status;
  const message = error.response?.data.data.message ?? '알 수 없는 오류가 발생했습니다.';

  switch (status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 409:
      toast(message);
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
