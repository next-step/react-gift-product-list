import { PaddingMd } from '../../common/Padding';
import RankingItem from '../RankingItem';
import { PaddingLg } from '../../common/Padding';
import PersonCategory from '../PersonCategory';
import BehaviorCategory from '../BehaviorCategory';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  // BEHAVIOR_FILTER_LABELS,
  // PERSON_FILTER_LABELS,
  type BehaviorFilterLabels,
  type BehaviorParam,
  type PersonFilterLabels,
  type PersonParam,
} from '../types';
import { ROUTE_PATH } from '@/routes/Router';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import type { ProductType } from '@/types/product';
import { RankingProducts, RankingTitle, RankingWrapper, ShowMoreBtn } from './Ranking.styles';

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
  const [personParam, setPersonParam] = useState<PersonParam>('ALL');
  const [behaviorParam, setBehaviorParam] = useState<BehaviorParam>('MANY_RECEIVE');
  const [showAll, setShowAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:3000/api/products/ranking', {
          params: {
            targetType: personParam,
            rankType: behaviorParam,
          },
        });
        const data = res.data.data;
        if (data.length > 0) {
          setProducts(data);
          setIsLoading(false);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error(e);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [personParam, behaviorParam]);

  if (isLoading) return <div>📢 랭킹 데이터를 불러오고 있어요...</div>;

  if (!isLoading && products.length === 0) {
    return <div>📭 상품 랭킹이 없습니다.</div>;
  }
  const visible = showAll ? products : products.slice(0, 6);

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
