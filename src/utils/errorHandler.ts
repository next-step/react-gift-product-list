import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { AxiosErrorResponse } from '@/types/api';

const isAxiosError = (error: unknown): error is AxiosErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response === 'object'
  );
};

export const handleApiError = (
  error: unknown,
  navigate?: (path: string) => void,
  customHandlers?: Record<number, (message?: string) => void>
) => {
  if (!isAxiosError(error)) {
    toast.error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
    return;
  }
  
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.data?.message;
    
    if (customHandlers?.[status]) {
      customHandlers[status](message);
      return;
    }
    
    switch (status) {
      case 401:
        toast.error(message || '로그인이 필요합니다.');
        if (navigate) {
          navigate('/login');
        }
        break;
      case 400:
        toast.error(message || '잘못된 요청입니다.');
        break;
      case 403:
        toast.error(message || '접근 권한이 없습니다.');
        break;
      case 404:
        toast.error(message || '요청한 리소스를 찾을 수 없습니다.');
        break;
      case 500:
        toast.error(message || '서버에서 오류가 발생했습니다.');
        break;
      default:
        toast.error(message || '네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  } else {
    toast.error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

export const useErrorHandler = () => {
  const navigate = useNavigate();
  
  const handleError = useCallback((
    error: unknown,
    customHandlers?: Record<number, (message?: string) => void>
  ) => {
    handleApiError(error, navigate, customHandlers);
  }, [navigate]);
  
  return { handleError };
}; 