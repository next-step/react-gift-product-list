import StyledRankingAnyTagItem from '@styles/Home/RankingTagItem/StyledRankingAnyTagItem';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RANK_TAG_LIST: [string, RankTagTypeList][] = [
  ['많이 찜한', 'MANY_WISH'],
  ['많이 받은', 'MANY_RECEIVE'],
  ['많이 찜하고 받은', 'MANY_WISH_RECEIVE'],
];
type RankTagTypeList = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

const RankingAnyTagItem = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [selected, setSelected] = useState<RankTagTypeList>('MANY_WISH');

  const isValidSelectedOption = (value: string): value is RankTagTypeList => {
    return RANK_TAG_LIST.some(([, code]) => code === value);
  };
  useEffect(() => {
    const params = new URLSearchParams(search);
    const value = params.get('rankType');
    if (value && isValidSelectedOption(value)) {
      setSelected(value);
    } else {
      params.set('rankType', 'MANY_WISH');
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [search, navigate]);

  const handleClick = (value: RankTagTypeList) => {
    const params = new URLSearchParams(search);
    params.set('rankType', value);
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <>
      {RANK_TAG_LIST.map((item: string[]) => {
        const tag = item[1] as RankTagTypeList;
        return (
          <StyledRankingAnyTagItem
            key={tag}
            className='ranking-tag-item'
            onClick={() => handleClick(tag)}
            isSelected={selected === tag}
          >
            {item[0].toLowerCase()}
          </StyledRankingAnyTagItem>
        );
      })}
    </>
  );
};

export default RankingAnyTagItem;
