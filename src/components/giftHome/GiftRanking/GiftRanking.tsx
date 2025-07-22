import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import ProductCard from '@/components/giftHome/GiftThemes/ProductCard';
import Text from '@/common/Text';
import LoadingSpinner from '@/common/LoadingSpinner';
import useGiftRanking from '@/hooks/useGiftRanking';
import { type TargetType, type RankType } from '@/hooks/useFetch';

const targetTypes: TargetType[] = ['ALL', 'FEMALE', 'MALE', 'TEEN'];
const rankTypes: RankType[] = [
  'MANY_WISH',
  'MANY_RECEIVE',
  'MANY_WISH_RECEIVE',
];

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

const GiftRanking = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTarget = (searchParams.get('target') as TargetType) || 'ALL';
  const selectedRank = (searchParams.get('rank') as RankType) || 'MANY_WISH';

  const { products, loading, error, refetch } = useGiftRanking({
    target: selectedTarget,
    rank: selectedRank,
  });

  const updateTargetFilter = (target: TargetType) => {
    setSearchParams({ target, rank: selectedRank });
  };

  const updateRankFilter = (rank: RankType) => {
    setSearchParams({ target: selectedTarget, rank });
  };

  const handleRetry = () => {
    refetch();
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
        <CenteredBox>
          <Text size="label1" weight="regular">
            {error}
          </Text>
        </CenteredBox>
      ) : products.length === 0 ? (
        <CenteredBox>
          <Text size="label1" weight="regular">
            상품이 없습니다.
          </Text>
        </CenteredBox>
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

export default GiftRanking;

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

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
`;
