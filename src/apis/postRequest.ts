import axios from 'axios';
import axiosInstance from './axiosInstance';

interface PostRequestResult<T> {
  data: T | null;
  success: boolean;
  error: string | null;
  status?: number;
}

const postRequest = async <T>(
  url: string,
  body: Record<string, unknown>,
  options?: { headers?: Record<string, string> }
): Promise<PostRequestResult<T>> => {
  try {
    const res = await axiosInstance.post(url, body, options);
    return {
      data: res.data.data,
      success: true,
      error: null,
      status: res.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.data?.message ||
        '알 수 없는 에러가 발생했습니다.';

      return {
        data: null,
        success: false,
        error: message,
        status,
      };
    } else {
      return {
        data: null,
        success: false,
        error: '예상치 못한 에러',
      };
    }
  }
};

export default postRequest;
