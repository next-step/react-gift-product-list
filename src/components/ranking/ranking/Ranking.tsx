import { PaddingMd } from '../../common/Padding';
import RankingItem from '../RankingItem';
import { PaddingLg } from '../../common/Padding';
import PersonCategory from '../PersonCategory';
import BehaviorCategory from '../BehaviorCategory';
import { use, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  type BehaviorFilterLabels,
  type BehaviorParam,
  type PersonFilterLabels,
  type PersonParam,
} from '../types';
import { ROUTE_PATH } from '@/routes/Router';
import { useAuth } from '@/contexts/AuthContext';
import type { ProductType } from '@/types/product';
import { RankingProducts, RankingTitle, RankingWrapper, ShowMoreBtn } from './Ranking.styles';
import { useFetch } from '@/hooks/useFetch';
import { fetchRankingData } from '@/services/rankingApi';

//필터 옵션
const personFilterOptions: { label: PersonFilterLabels; emoji: string; param: PersonParam }[] = [
  { label: '전체', emoji: 'All', param: 'ALL' },
  { label: '남자가', emoji: '👨🏻', param: 'MALE' },
  { label: '여자가', emoji: '👩🏻', param: 'FEMALE' },
  { label: '청소년이', emoji: '👦🏻', param: 'TEEN' },
] as const;

const behaviorOptions: { label: BehaviorFilterLabels; param: BehaviorParam }[] = [
  { label: '받고 싶어한', param: 'MANY_WISH' },
  { label: '많이 선물한', param: 'MANY_RECEIVE' },
  { label: '위시로 받은', param: 'MANY_WISH_RECEIVE' },
] as const;


const Ranking = () => {
  const navigator = useNavigate();
  const { user } = useAuth();

  const [showAll, setShowAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPersonParams = searchParams.get('targetType') as PersonParam | null;
  const queryBehaviorParam = searchParams.get('rankType') as BehaviorParam | null;
  const [personParam, setPersonParam] = useState<PersonParam>('ALL');
  const [behaviorParam, setBehaviorParam] = useState<BehaviorParam>('MANY_RECEIVE');
  useEffect(() => {
    if (queryPersonParams) {
      setPersonParam(queryPersonParams);
    }
    if (queryBehaviorParam) {
      setBehaviorParam(queryBehaviorParam);
    }
  }, [queryPersonParams, queryBehaviorParam]);

  const handlePersonSelect = (param: PersonParam) => {
    setPersonParam(param);
    searchParams.set('targetType', param);
    setSearchParams(searchParams);
  };
  const handleBehaviorSelect = (param: BehaviorParam) => {
    setBehaviorParam(param);
    searchParams.set('rankType', param);
    setSearchParams(searchParams);
  };

  const handleProductClick = (id: number) => {
    if (!user.isLoggedIn) navigator(ROUTE_PATH.LOGIN);
    else {
      navigator(ROUTE_PATH.ORDER.replace(':productId', String(id)));
    }
  };
 

  const { data: products, isLoading: isProductLoading } = useFetch<ProductType[]>({
    fetcher: () => fetchRankingData(personParam, behaviorParam),
    initValue: [],
    deps: [personParam, behaviorParam], //쿼리 파라미터가 바뀔 때마다 fetch를 새로 해줘야하므로!
  });

  const visible = showAll ? products : products.slice(0, 6);

  if (isProductLoading) return <div>📢 랭킹 데이터를 불러오고 있어요...</div>;

  if (!isProductLoading && products.length === 0) {
    return <div>📭 상품 랭킹이 없습니다.</div>;
  }
  return (
    <RankingWrapper>
      <RankingTitle>실시간 급상승 선물랭킹</RankingTitle>
      <PaddingMd />
      <PersonCategory
        options={personFilterOptions}
        selected={personParam}
        onSelect={handlePersonSelect}
      />
      <PaddingMd />
      <BehaviorCategory
        options={behaviorOptions}
        selected={behaviorParam}
        onSelect={handleBehaviorSelect}
      />
      <PaddingMd />
      <RankingProducts>
        {visible.map((product) => (
          <RankingItem
            onClick={() => handleProductClick(product.id)}
            key={product.id}
            {...product}
          ></RankingItem>
        ))}
      </RankingProducts>

      <PaddingLg />
      <ShowMoreBtn
        onClick={() => {
          setShowAll(!showAll);
        }}
      >
        {showAll ? '접기' : '더보기'}
      </ShowMoreBtn>

      <PaddingLg />
    </RankingWrapper>
  );
};

export default Ranking;
