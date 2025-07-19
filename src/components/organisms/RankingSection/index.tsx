import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { genderItems, actionItems } from '@/data/ranking';
import { getRankingProducts } from '@/lib/api';
import { type RankingProduct, type TargetType, type RankType } from '@/types/api';
import { useFetchState } from '@/hooks/useFetchState';
import { RankingItemCard, Loading, ErrorMessage } from '@/components';
import * as S from './styles';

const RankingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<RankingProduct[]>([],true);
  const navigate = useNavigate();

  const selectedGender = searchParams.get('gender') || 'ALL';
  const selectedAction = searchParams.get('action') || 'MANY_WISH';

  useEffect(() => {
    const fetchRankingProducts = async () => {
      setLoading(true);
      try {
        const data = await getRankingProducts(selectedGender as TargetType, selectedAction as RankType);
        setSuccess(data);
      } catch {
        setError();
      }
    };
    
    fetchRankingProducts();
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
      
      {fetchState.isLoading ? (
        <Loading height="400px" />
      ) : fetchState.isError ? (
        <ErrorMessage height="400px" />
      ) : fetchState.data.length === 0 ? (
        <S.EmptyMessage>상품이 없습니다.</S.EmptyMessage>
      ) : (
        <>
          <S.Grid>
            {(isExpanded ? fetchState.data : fetchState.data.slice(0, 6)).map((item, index) => (
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
        </>
      )}
    </S.Section>
  );
};

export default RankingSection; 