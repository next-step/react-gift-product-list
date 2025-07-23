import type { UserInfoData, UserInfoProps } from '@/page/Login/hooks/useLogin';
import { apiClient } from './apiClient';
import type { GiftRankingItem, RankingApiProps } from '@/page/Home/hooks/useRanking';
import type { OrderInfoValues } from '@/page/Order';
import type { ProductSummaryData } from '@/page/Order/hooks/useRnaking';
import type { ThemeInfo } from '@/page/Home/hooks/useTheme';
import type { ThemeIdInfoData, ThemeIdProductsData } from '@/page/Themes';

export interface FetchOrderProps {
  orderData: OrderInfoValues;
  id: string;
}
interface fetchThemeIdProductsProps {
  index: number;
  currentCursor: number;
  currentPage: number;
}
interface OrderResponseData {
  success: boolean;
}
interface OrderResponseData {
  success: boolean;
}

export const requests = {
  fetchUserInfos: ({ username, password }: UserInfoProps): Promise<UserInfoData> => {
    const data = {
      email: `${username.value}`,
      password: `${password.value}`,
    };
    return apiClient.post('/api/login', data);
  },
  fetchOrder: ({ orderData, id }: FetchOrderProps): Promise<OrderResponseData> => {
    const { message, name, receiverInfos } = orderData;
    const data = {
      productId: Number(id),
      message: message,
      messageCardId: 'card123',
      ordererName: name,
      receivers: receiverInfos,
    };
    return apiClient.post('/api/order', data);
  },
  fetchSummary: (id: string): Promise<ProductSummaryData> => {
    return apiClient.get(`/api/products/${id}/summary`);
  },
  fetchRanking: ({
    activeGenerationButton,
    activeFilterButton,
  }: RankingApiProps): Promise<GiftRankingItem[]> => {
    return apiClient.get(
      `/api/products/ranking?targetType=${activeGenerationButton}&rankType=${activeFilterButton}`
    );
  },
  fetchTheme: (): Promise<ThemeInfo[]> => apiClient.get('/api/themes'),
  fetchThemeIdInfo: (index: number): Promise<ThemeIdInfoData> =>
    apiClient.get(`/api/themes/${index}/info`),
  fetchThemeIdProducts: ({
    index,
    currentCursor,
    currentPage,
  }: fetchThemeIdProductsProps): Promise<ThemeIdProductsData> =>
    apiClient.get(`/api/themes/${index}/products?cursor=${currentCursor}?page=${currentPage}`),
};
