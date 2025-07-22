import { THEMES_PRODUCTS } from '@/api/api.ts';
import useInfiniteFetchThemesProduct from '@/hooks/fetch/useInfiniteFetchThemesProduct.ts';

export default function useFetchThemesProduct(themesId: number) {
  const url = THEMES_PRODUCTS(themesId);
  return useInfiniteFetchThemesProduct(url);
}
