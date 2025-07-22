import api from '@/lib/axiosInstance';

export const fetchRankingData = async (personParam: PersonParam, behaviorParam: BehaviorParam) => {
  return await api
    .get('/products/ranking', {
      params: { targetType: personParam, rankType: behaviorParam },
    })
    .then((res) => res.data.data);
};
