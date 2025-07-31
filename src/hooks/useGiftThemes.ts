import { fetchThemes, type Category } from '@/api/themes';
import { useFetch } from '@/hooks/useFetch';

const useGiftThemes = () => {
  const {
    data: categories,
    loading,
    error,
  } = useFetch<Category[]>(fetchThemes, [], {
    initialData: [],
    errorMessage: '테마 불러오기에 실패했습니다.',
  });

  return { categories: categories || [], loading, error };
};

export default useGiftThemes;
