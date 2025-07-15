import type { Gift } from "@/types/gift";
import GiftsList from "./GiftsList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import BoxMessage from "./common/BoxMessage";

type GiftsRenderProps = {
  gifts: Gift[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const GiftsRender = ({ gifts, isLoading, isError }: GiftsRenderProps) => {
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
