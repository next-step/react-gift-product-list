import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PATH } from '@/constants/path.ts';

export default function useErrorRedirect(error) {
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
      navigate(PATH.HOME);
    }
  }, [error, navigate]);

  return error;
}