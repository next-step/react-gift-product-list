import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface UseToastOnErrorOptions {
  error: boolean;
  id?: string;
  message?: string;
  onError?: () => void;
}

export default function useToastOnError({
  error,
  id,
  message = '에러가 발생했습니다.',
  onError,
}: UseToastOnErrorOptions) {
  useEffect(() => {
    if (!error) return;

    if (!id || !toast.isActive(id)) {
      toast.error(message, { toastId: id });
    }

    onError?.();
  }, [error, id, message, onError]);
}
