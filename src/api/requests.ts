import type { UserInfoData, UserInfoProps } from '@/page/Login/hooks/useLogin';
import { apiClient } from './apiClient';
import type { GiftRankingItem, RankingApiProps } from '@/page/Home/hooks/useRanking';
import type { OrderInfoValues } from '@/page/Order';
import type { ProductSummaryData } from '@/page/Order/hooks/useRnaking';
import type { ThemeInfo } from '@/page/Home/hooks/useTheme';

export interface FetchOrderProps {
  orderData: OrderInfoValues;
  id: string;
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
};
