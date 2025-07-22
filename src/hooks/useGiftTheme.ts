import useApiRequest from './useApiRequest';
import { fetchThemes } from '@/api/ThemeApi';
import type { GiftThemeType } from '@/types/theme';

export default function useGiftTheme() {
  const { data: themes, isLoading, hasError } = useApiRequest<GiftThemeType[], []>(fetchThemes, []);

  return { themes, isLoading, hasError };
}
