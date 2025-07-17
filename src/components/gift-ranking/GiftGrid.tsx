import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProductRankings } from '@/api/productRankingApi';
import { FadeLoader } from 'react-spinners';
import GiftItem from '@/components/gift-ranking/GiftItem';
import { GridWrapper, MoreButton, ButtonWrapper } from '@/components/gift-ranking/Grid.style';
import { useAuth } from '@/context/AuthContext';
import styled from '@emotion/styled';

interface ProuductRanking {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    name: string;
    imageURL: string;
  };
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
}
interface GiftGridProps {
  gender: string;
  category: string;
}

const LodingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GiftGrid = ({ gender, category }: GiftGridProps) => {
  const [productRankings, setProductRankings] = useState<ProuductRanking[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const loadRanking = async () => {
      setIsLoading(true);
      setHasError(false);
      
      try {
        const response = await fetchProductRankings(category, gender);
        setProductRankings(response.data.data);
      } catch (error) {
        console.error('상품 랭킹 불러오기 실패:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadRanking();
  }, [ category, gender]);

  const handleCount = () => {
    if (visibleCount >= 21) {
      setVisibleCount(6);
    } else {
      setVisibleCount((prev) => prev + 6);
    }
  };
  if (isLoading) {
    return (
      <LodingWrapper>
        <FadeLoader color="#033128" height={15} width={5} />
      </LodingWrapper>
    );
  }
  if (hasError || productRankings.length === 0) {
    return null;
  }

  const visibleGifts = productRankings.slice(0, visibleCount);

  return (
    <>
      <GridWrapper>
        {visibleGifts.map((gift, index) => (
          <GiftItem
            key={gift.id}
            id={gift.id}
            name={gift.name}
            imageURL={gift.imageURL}
            brand={gift.brandInfo.name}
            price={gift.price.sellingPrice}
            discountRate={gift.price.discountRate}
            rank={index + 1}
            onClick={() => {
              if (!isLoggedIn) {
                alert('로그인이 필요합니다.');
                navigate('/login');
                return;
              }
              navigate('/order', { state: { id: gift.id } });
            }}
          />
        ))}
      </GridWrapper>
      <ButtonWrapper>
        <MoreButton onClick={handleCount}>
          {visibleCount >= productRankings.length ? '접기' : '더보기'}
        </MoreButton>
      </ButtonWrapper>
    </>
  );
};

export default GiftGrid;
