import GiftsList from "./GiftsList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BoxMessage from "./common/BoxMessage";
import { fetchProductsRanking } from "@/api/products";
import { useCallback } from "react";
import useApiRequest from "@/hooks/useApiRequest";
import type { TargetType, RankType } from "@/types/gift";

type GiftsRenderProps = {
  selectedTypes: {
    targetType: TargetType;
    rankType: RankType;
  };
};

const GiftsRender = ({ selectedTypes }: GiftsRenderProps) => {
  const requestFn = useCallback(() => {
    return fetchProductsRanking(
      selectedTypes.targetType,
      selectedTypes.rankType,
    );
  }, [selectedTypes]);
  const { data: gifts, isLoading, isError } = useApiRequest({ requestFn });

  if (isLoading) {
    return <LoadingSpinner height="266px" />;
  }
  if (isError) {
    return (
      <BoxMessage
        message="상품을 불러오는 데 실패했습니다. 다시 시도해주세요."
        height="266px"
      />
    );
  }
  if (!gifts || gifts.length === 0) {
    return <BoxMessage message="상품이 없습니다." height="266px" />;
  }
  return <GiftsList gifts={gifts} />;
};

export default GiftsRender;
