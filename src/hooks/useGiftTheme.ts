import useApiRequest from './useApiRequest';
import { fetchThemes } from '@/api/ThemeApi';
import type { GiftThemeType } from '@/types/theme';

export default function useGiftTheme() {
  const { data: themes, loading, error } = useApiRequest<GiftThemeType[], []>(fetchThemes, []);

  return { themes, loading, error };
}
