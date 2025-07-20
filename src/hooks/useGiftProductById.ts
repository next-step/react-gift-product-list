import { useEffect, useState } from 'react';
import type { GiftItem } from '../types/GiftItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const BASE_URL = 'http://localhost:3000';

export const fetchGiftProductById = async (
  id: number
): Promise<GiftItem> => {
  const res = await fetch(`${BASE_URL}/api/products/${id}/summary`);
  if (!res.ok) {
    const errorText = await res.text();
    const message =
      res.status >= 400 && res.status < 500
        ? errorText || '잘못된 요청입니다.'
        : '서버 오류가 발생했습니다.';
    throw new Error(message);
  }
  const data = await res.json();
  return data.data;

};

export const useGiftProductById = (id: number) => {
  const [data, setData] = useState<GiftItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id == null) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const product = await fetchGiftProductById(id);
        setData(product);
      } catch (err: any) {
        setError(err.message || '알 수 없는 오류');
        toast.error(err.message);
        navigate('/', { replace: true });

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);


  return { data, loading, error };
};
