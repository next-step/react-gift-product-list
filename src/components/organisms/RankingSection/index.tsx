import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { genderItems, actionItems } from '@/data/ranking';
import { getRankingProducts } from '@/lib/api';
import { type RankingProduct, type TargetType, type RankType } from '@/types/api';
import { RankingItemCard } from '@/components';
import * as S from './styles';

interface FetchState<T> {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
}

const RankingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [rankingProducts, setRankingProducts] = useState<RankingProduct[]>([]);
  const [fetchState, setFetchState] = useState<FetchState<RankingProduct[]>>({
    isLoading: true,
    isError: false,
    data: null,
  });
  const navigate = useNavigate();

  const selectedGender = searchParams.get('gender') || 'ALL';
  const selectedAction = searchParams.get('action') || 'MANY_WISH';

  useEffect(() => {
    setFetchState(prev => ({ ...prev, isLoading: true }));
    
    getRankingProducts(selectedGender as TargetType, selectedAction as RankType)
      .then((data) => {
        setRankingProducts(data);
        setFetchState({
          isLoading: false,
          isError: false,
          data,
        });
      })
      .catch(() => {
        setFetchState({
          isLoading: false,
          isError: true,
          data: null,
        });
      });
  }, [selectedGender, selectedAction]);

  const handleGenderChange = (gender: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('gender', gender);
      return newParams;
    });
  };

  const handleActionChange = (action: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('action', action);
      return newParams;
    });
  };

  const handleItemCardClick = (item: RankingProduct) => {
    navigate(`/order/${item.id}`);
  };

  if (fetchState.isLoading) {
    return <div>Loading...</div>;
  }
  if (fetchState.isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <S.Section>
      <S.Title>실시간 급상승 선물랭킹</S.Title>
      
      <S.FilterContainer>
        <S.GenderFilterContainer>
          {genderItems.map(option => (
            <S.GenderButton key={option.key} onClick={() => handleGenderChange(option.key)}>
              <S.GenderIconContainer isSelected={selectedGender === option.key}>
                {option.icon}
              </S.GenderIconContainer>
              <S.GenderText isSelected={selectedGender === option.key}>
                {option.label}
              </S.GenderText>
            </S.GenderButton>
          ))}
        </S.GenderFilterContainer>
        
        <S.ActionFilterContainer>
          {actionItems.map(action => (
            <S.ActionButton 
              key={action.key} 
              isSelected={selectedAction === action.key}
              onClick={() => handleActionChange(action.key)}
            >
              {action.label}
            </S.ActionButton>
          ))}
        </S.ActionFilterContainer>
      </S.FilterContainer>
      
      <S.Grid>
        {(isExpanded ? rankingProducts : rankingProducts.slice(0, 6)).map((item, index) => (
          <RankingItemCard
            key={item.id}
            imageUrl={item.imageURL}
            title={item.name}
            subtitle={item.brandInfo.name}
            price={item.price.sellingPrice}
            rank={index + 1}
            onClick={() => handleItemCardClick(item)}
          />
        ))}
      </S.Grid>

      <S.MoreButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '접기' : '더보기'}
      </S.MoreButton>
    </S.Section>
  );
};

export default RankingSection; 