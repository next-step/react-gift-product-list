import { useEffect, useState } from 'react';
import { fetchThemes, type Category } from '@/api/themes';

const useGiftThemes = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const data = await fetchThemes();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || '테마 불러오기에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadThemes();
  }, []);

  return { categories, loading, error };
};

export default useGiftThemes;
