import StyledRankingAnyTagItem from '@src/components/Home/PresentRanking/Item/StyledRankingAnyTagItem';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
interface RANK_TAG_LIST_TYPE {
  [key: string]: string;
}
const RANK_TAG_LIST: RANK_TAG_LIST_TYPE = {
  MANY_WISH: '많이 찜한',
  MANY_RECEIVE: '많이 받은',
  MANY_WISH_RECEIVE: '많이 찜하고 받은',
};
type RankTagTypeList = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

const isValidSelectedOption = (key: string): key is RankTagTypeList => {
  // return RANK_TAG_LIST.hasOwnProperty(key);
  // RANK_TAG_LIST의 타입을 우리가 정의했으므로 object의 함수인 hasOwnProperty를 사용할 수 없는 문제
  return RANK_TAG_LIST[key] !== undefined;
};

const RankingAnyTagItem = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const [selected, setSelected] = useState<RankTagTypeList>('MANY_WISH');

  useEffect(() => {
    if (params.get('rankType') === null) {
      params.set('rankType', 'MANY_WISH');
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      const rankType = params.get('rankType');
      if (rankType && isValidSelectedOption(rankType)) {
        setSelected(rankType);
      } else {
        params.set('rankType', selected);
        navigate(`?${params.toString()}`, { replace: true });
      }
    }
  }, [navigate, search, params, selected]);

  const handleClick = (rankType: RankTagTypeList) => {
    params.set('rankType', rankType);
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <>
      {Object.entries(RANK_TAG_LIST).map(([key, value]) => {
        const tag = key as RankTagTypeList;
        return (
          <StyledRankingAnyTagItem
            key={tag}
            className='ranking-tag-item'
            onClick={() => handleClick(tag)}
            isSelected={selected === tag}
          >
            {value}
          </StyledRankingAnyTagItem>
        );
      })}
    </>
  );
};

export default RankingAnyTagItem;
