/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useGiftRanking } from '../hooks/useGiftRanking';
import { useGiftRankingFilter } from '../hooks/useGiftRankingFilter';
import type { GiftItem } from '../types/GiftItem';

const Container = styled.div`
  padding: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const GiftCard = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

interface BadgeProps {
  index: number;
}

const RankBadge = styled.div<BadgeProps>`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${({ index, theme }) =>
    index < 3 ? theme.colors.red600 : theme.colors.gray600};
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  padding: 8px;
`;

const Brand = styled.div`
  font-size: ${({ theme }) =>
    theme.typography.label2Regular.fontSize};
  color: ${({ theme }) => theme.colors.gray600};
`;

const Name = styled.div`
  font-weight: bold;
  margin-top: 4px;
`;

const Price = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blue700};
`;

const MoreButton = styled.button`
  margin: 24px auto 0;
  display: block;
  padding: 12px 24px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background: white;
`;

export const RankingGrid = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  const { selectedFilter, selectedTab } = useGiftRankingFilter();

  const {
    data: products,
    isLoading,
    isError,
  } = useGiftRanking(selectedFilter, selectedTab);

  const handleClick = (id: number) => {
    if (isAuthenticated) {
      navigate(`/order/${id}`);
    } else {
      navigate('/login', { state: { redirectTo: `/order/${id}` } });
    }
  };

  const handleMore = () =>
    setVisibleCount(prev =>
      products ? Math.min(prev + 6, products.length) : prev
    );

  if (isLoading)
    return <Container>상품 랭킹을 불러오는 중입니다...</Container>;
  if (isError || !products)
    return <Container>상품 정보를 불러오지 못했습니다.</Container>;
  if (products.length === 0)
    return <Container>표시할 상품이 없습니다.</Container>;

  return (
    <Container>
      <Grid>
        {products
          .slice(0, visibleCount)
          .map((item: GiftItem, index) => (
            <GiftCard
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <RankBadge index={index}>{index + 1}</RankBadge>
              <ProductImage src={item.imageURL} alt={item.name} />
              <ProductInfo>
                <Brand>{item.brandInfo.name}</Brand>
                <Name>{item.name}</Name>
                <Price>
                  {item.price.sellingPrice.toLocaleString()}원
                </Price>
              </ProductInfo>
            </GiftCard>
          ))}
      </Grid>

      {visibleCount < products.length && (
        <MoreButton onClick={handleMore}>더보기</MoreButton>
      )}
    </Container>
  );
};
