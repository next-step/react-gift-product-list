import { useEffect, useState } from 'react';
import { fetchGiftThemes } from '../api/giftTheme';
import { type GiftTheme } from '../types/GiftTheme';

export const useGiftThemes = () => {
  const [data, setData] = useState<GiftTheme[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchGiftThemes();
        console.log('useGiftThemes select res:', res);
        setData(res.data);
      } catch (err: any) {
        setError(err.message || '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    getThemes();
  }, []);

  return { data, loading, error };
};
