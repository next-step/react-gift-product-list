import useFetch from './useFetch';
import apiClient from '../api';
import type { ThemeResponse } from '../api/types';

/**
 * 테마 목록을 조회하는 커스텀 훅
 */
function useThemes() {
  const baseUrl = `${apiClient.defaults.baseURL}/api/themes`;
  return useFetch<ThemeResponse>(baseUrl);
}

export default useThemes;
