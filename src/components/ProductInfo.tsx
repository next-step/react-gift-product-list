import styled from '@emotion/styled';
import { Spinner } from '@/components/common/Spinner';

interface ProductInfoProps {
  imgSrc: string;
  productName: string;
  brandName: string;
  price: number;
}

export function ProductInfo({ imgSrc, productName, brandName, price }: ProductInfoProps) {
  if (!imgSrc || !productName || !brandName || price === undefined) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <Image src={imgSrc} alt={productName} />
      <Info>
        <Brand>{brandName}</Brand>
        <Name>{productName}</Name>
        <Price>{`${price.toLocaleString()}원`}</Price>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.semanticColors.border.default};
  border-bottom: 1px solid ${({ theme }) => theme.semanticColors.border.default};
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Brand = styled.span`
  ${({ theme }) => theme.typography.label.label2Regular};
  color: ${({ theme }) => theme.semanticColors.text.sub};
`;

const Name = styled.span`
  ${({ theme }) => theme.typography.body.body2Bold};
  color: ${({ theme }) => theme.semanticColors.text.default};
`;

const Price = styled.span`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.semanticColors.text.default};
  margin-top: 4px;
`;
