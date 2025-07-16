import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCard from '@/components/giftHome/GiftThemes/ProductCard';
import Text from '@/common/Text';
import { fetchProductRanking, type Product } from '@/api/ranking';
import LoadingSpinner from '@/common/LoadingSpinner';

const targetTypes = ['ALL', 'FEMALE', 'MALE', 'TEEN'] as const;
type TargetType = (typeof targetTypes)[number];

const rankTypes = ['MANY_WISH', 'MANY_RECEIVE', 'MANY_WISH_RECEIVE'] as const;
type RankType = (typeof rankTypes)[number];

const targetTypeLabels: Record<TargetType, string> = {
  ALL: '전체',
  FEMALE: '여성이',
  MALE: '남성이',
  TEEN: '청소년이',
};

const rankTypeLabels: Record<RankType, string> = {
  MANY_WISH: '받고 싶어한',
  MANY_RECEIVE: '많이 선물한',
  MANY_WISH_RECEIVE: '위시로 받은',
};

const GiftChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTarget = (searchParams.get('target') as TargetType) || 'ALL';
  const selectedRank = (searchParams.get('rank') as RankType) || 'MANY_WISH';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      try {
        const data = await fetchProductRanking(selectedTarget, selectedRank);
        setProducts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || '랭킹 데이터를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [selectedTarget, selectedRank]);

  const updateTargetFilter = (target: TargetType) => {
    setSearchParams({ target, rank: selectedRank });
  };

  const updateRankFilter = (rank: RankType) => {
    setSearchParams({ target: selectedTarget, rank });
  };

  return (
    <Layout>
      <Text size="title1" weight="bold">
        실시간 급상승 선물랭킹
      </Text>

      <TargetContainer>
        {targetTypes.map((target) => (
          <TargetBox
            key={target}
            isSelected={selectedTarget === target}
            onClick={() => updateTargetFilter(target)}
          >
            <TargetText isSelected={selectedTarget === target}>
              {targetTypeLabels[target]}
            </TargetText>
          </TargetBox>
        ))}
      </TargetContainer>

      <RankContainer>
        {rankTypes.map((rank) => (
          <RankOption
            key={rank}
            isSelected={selectedRank === rank}
            onClick={() => updateRankFilter(rank)}
          >
            {rankTypeLabels[rank]}
          </RankOption>
        ))}
      </RankContainer>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Text size="label2" weight="bold">
          {error}
        </Text>
      ) : (
        <ProductItem>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductItem>
      )}
    </Layout>
  );
};

export default GiftChart;

const Layout = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6};
`;

const TargetContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing7};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.spacing7};
`;

interface TargetBoxProps {
  isSelected: boolean;
}

const TargetBox = styled.div<TargetBoxProps>`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue700 : theme.colors.blue100};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface TargetTextProps {
  isSelected: boolean;
}

const TargetText = styled.span<TargetTextProps>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ isSelected, theme }) =>
    isSelected ? 'white' : theme.colors.gray700};
`;

const RankContainer = styled.div`
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 24px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.blue200};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.blue100};
`;

interface RankOptionProps {
  isSelected: boolean;
}

const RankOption = styled.div<RankOptionProps>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue800 : theme.colors.blue400};
  cursor: pointer;
`;

const ProductItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.spacing3};
  margin-top: ${({ theme }) => theme.spacing.spacing4};
`;
