import useApiRequest from './useApiRequest';
import { fetchThemeInfo } from '@/api/ThemeListApi';

export default function useThemeInfo(themeId: number) {
  return useApiRequest(fetchThemeInfo, [themeId]);
}
