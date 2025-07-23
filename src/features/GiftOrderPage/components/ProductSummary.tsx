import styled from '@emotion/styled';
import type { ProductSummaryInfo } from '../OrderTypes';

interface ProductSummaryProps {
  productInfo: ProductSummaryInfo;
}

const ProductSummary = ({ productInfo }: ProductSummaryProps) => {
  return (
    <Wrapper>
      <SectionTitle>상품정보</SectionTitle>

      <Card>
        <ProductImage src={productInfo.imageURL} alt="" />

        <InfoBox>
          <ProductName>{productInfo.name}</ProductName>
          <BrandName>{productInfo.brandName}</BrandName>
          <Price>
            상품가 <Highlight> {productInfo.price}원</Highlight>
          </Price>
        </InfoBox>
      </Card>
    </Wrapper>
  );
};

export default ProductSummary;

const Wrapper = styled.div(({ theme }) => ({
  marginTop: theme.spacing.spacing5,
  padding: `0 ${theme.spacing.spacing7}`,
  paddingBottom: '100px',
}));
const SectionTitle = styled.div(({ theme }) => ({
  ...theme.typography.label1Bold,
  marginBottom: theme.spacing.spacing3,
}));

const Card = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.colors.semantic.borderDefault}`,
  borderRadius: theme.spacing.spacing3,
  padding: theme.spacing.spacing3,
  gap: theme.spacing.spacing4,
}));

const ProductImage = styled.img(({ theme }) => ({
  width: '4.5rem',
  height: '4.5rem',
  borderRadius: theme.spacing.spacing2,
  objectFit: 'cover',
}));

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.div(({ theme }) => ({
  ...theme.typography.title2Regular,
  color: theme.colors.semantic.textDefault,
}));

const BrandName = styled.div(({ theme }) => ({
  ...theme.typography.subtitle2Regular,
  color: theme.colors.semantic.textSub,
}));

const Price = styled.div(({ theme }) => ({
  ...theme.typography.subtitle2Regular,
  color: theme.colors.semantic.textSub,
  marginTop: theme.spacing.spacing1,
}));

const Highlight = styled.span(({ theme }) => ({
  ...theme.typography.body1Bold,
  color: theme.colors.semantic.textDefault,
  marginLeft: theme.spacing.spacing2,
}));
