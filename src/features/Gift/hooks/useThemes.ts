import { useApi } from '@/hooks/useApi';
import { api } from '@/lib/axios';

interface Theme {
  themeId: number;
  name: string;
  image: string;
}

export const useThemes = () => {
  const { data, loading, error } = useApi<Theme[]>(async () => {
    const response = await api.get('/themes');
    return response.data.data;
  });
  return { themes: data ?? [], loading, error };
};
