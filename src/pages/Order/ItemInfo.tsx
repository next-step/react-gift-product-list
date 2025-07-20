import {
  ItemInfoContainer,
  ItemInfoTitle,
  ItemContainer,
  ItemImg,
  DetailContainer,
  DeatilTitle,
  DetailCompany,
  DetailPrice,
  DetailPriceContainer,
} from '@/styles/Order/ItemInfo.styles';
import type { ProductSummary } from '@/types/DTO/productDTO';

type ItemInfoProps = {
  item: ProductSummary;
};
function ItemInfo({ item }: ItemInfoProps) {
  console.log(item);
  return (
    <ItemInfoContainer>
      <ItemInfoTitle>상품 정보</ItemInfoTitle>
      <ItemContainer>
        {item.imageURL && <ItemImg src={item.imageURL} />}
        <DetailContainer>
          <DeatilTitle>{item.name}</DeatilTitle>
          <DetailCompany>{item.brandName}</DetailCompany>
          <DetailPriceContainer>
            <p>상품가</p>
            <DetailPrice>{item.price}</DetailPrice>
          </DetailPriceContainer>
        </DetailContainer>
      </ItemContainer>
    </ItemInfoContainer>
  );
}

export default ItemInfo;
