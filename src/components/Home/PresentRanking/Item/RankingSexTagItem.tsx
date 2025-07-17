import StyledRankingSexTagItemBtn from '@src/components/Home/PresentRanking/Item/StyledRankingSexTagItemBtn';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
interface TARGET_ITEM_LIST {
  [key: string]: string;
}
const TARGET_ITEM_LIST: TARGET_ITEM_LIST = {
  ALL: '전체',
  FEMALE: '여성이',
  MALE: '남성이',
  TEEN: '청소년이',
};
type TARGET_ITEM_TYPE = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';

const StyledRankingSexTagItem = styled.div`
  width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const RankingSexTagItem = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const [selected, setSelected] = useState<TARGET_ITEM_TYPE>('ALL');

  const isValidSelectedOption = (key: string): key is TARGET_ITEM_TYPE => {
    return TARGET_ITEM_LIST[key] !== undefined;
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const key = params.get('targetType');
    if (key && isValidSelectedOption(key)) {
      setSelected(key);
    } else {
      params.set('targetType', selected);
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [search, navigate, selected]);

  const handleClick = (key: TARGET_ITEM_TYPE) => {
    const params = new URLSearchParams(search);
    params.set('targetType', key);
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <>
      {Object.entries(TARGET_ITEM_LIST).map(([key, value]) => {
        const tag = key as TARGET_ITEM_TYPE;
        return (
          <StyledRankingSexTagItemBtn
            isSelected={selected === tag}
            key={tag}
            onClick={() => handleClick(tag)}
          >
            <StyledRankingSexTagItem className='ranking-sex-tag-item' />
            <p>{value}</p>
          </StyledRankingSexTagItemBtn>
        );
      })}
    </>
  );
};

export default RankingSexTagItem;
