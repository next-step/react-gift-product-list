import useApi from '@/apis/useApi';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

interface ApiResponse {
  data: Theme[];
}

export const useGetThemes = () => {
  const { data: themesResponse, isLoading, error } = useApi<ApiResponse>('get', '/themes');

  return { themes: themesResponse?.data || [], loading: isLoading, error };
};
