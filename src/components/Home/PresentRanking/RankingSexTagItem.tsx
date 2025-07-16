import StyledRankingSexTagItemBtn from '@styles/Home/RankingTagItem/StyledRankingSexTagItemBtn';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TARGET_ITEM_LIST: [string, TARGET_ITEM_TYPE][] = [
  ['전체', 'ALL'],
  ['여성이', 'FEMALE'],
  ['남성이', 'MALE'],
  ['청소년이', 'TEEN'],
];
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

  const isValidSelectedOption = (value: string): value is TARGET_ITEM_TYPE => {
    return TARGET_ITEM_LIST.some(([, code]) => code === value);
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    const value = params.get('targetType');
    if (value && isValidSelectedOption(value)) {
      setSelected(value);
    } else {
      params.set('targetType', selected);
      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [search, navigate, selected]);

  const handleClick = (value: TARGET_ITEM_TYPE) => {
    const params = new URLSearchParams(search);
    params.set('targetType', value);
    navigate(`?${params.toString()}`, { replace: true });
  };
  return (
    <>
      {TARGET_ITEM_LIST.map((item: [string, TARGET_ITEM_TYPE]) => {
        const tag = item[1] as TARGET_ITEM_TYPE;
        return (
          <StyledRankingSexTagItemBtn
            isSelected={selected === tag}
            key={tag}
            onClick={() => handleClick(tag)}
          >
            <StyledRankingSexTagItem className='ranking-sex-tag-item' />
            <p>{item[0].toLowerCase()}</p>
          </StyledRankingSexTagItemBtn>
        );
      })}
    </>
  );
};

export default RankingSexTagItem;
