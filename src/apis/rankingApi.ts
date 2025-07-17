import axiosInstance from './axiosInstance';

export const fetchRankedProducts = async (
  apiTargetType: string,
  apiRankType: string
) => {
  const res = await axiosInstance.get(
    `/products/ranking?targetType=${apiTargetType}&rankType=${apiRankType}`
  );
  return res.data;
};
