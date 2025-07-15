import { useQuery } from '@tanstack/react-query';
import { fetchGiftThemes } from '../api/gift';

export const useGiftThemes = () => {
  return useQuery({
    queryKey: ['giftThemes'],
    queryFn: fetchGiftThemes,
    select: res => {
      console.log('useGiftThemes select res:', res);
      return res.data;
    },
  });
};
