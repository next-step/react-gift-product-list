import type { ProductSummary } from '@/types';
import * as S from '@/styles/OrderPage.styles';

export const ProductInfoSection = ({ item }: { item: ProductSummary }) => (
  <div css={S.formSection}>
    <h3>상품 정보</h3>
    <div css={S.productInfo}>
      <img src={item.imageURL} alt={item.name} />
      <div className="details">
        <span className="brand">{item.brandName}</span>
        <span className="name">{item.name}</span>
        <span className="price">{item.price.toLocaleString()}원</span>
      </div>
    </div>
  </div>
);
