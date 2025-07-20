import StyledRankingSexTagItemBtn from '@src/components/Home/PresentRanking/Item/StyledRankingSexTagItemBtn';
import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
interface TARGET_ITEM_LIST {
  [key: string]: string;
  ALL: '전체';
  FEMALE: '여성이';
  MALE: '남성이';
  TEEN: '청소년이';
}
//TODO : as const를 활용해 구체적인 타입을 잡아보면 어떨까요 라는 말씀을 제대로 이해하지 못하였습니다.
// as const의 사용은 cosnt 변수의 타입 추론은 할당한 값을 타입처럼(string이 아닌 value인 '전체'를 타입으로 인식)하는데
// 현재는 TARGET_ITEM_LIST의 value에 '전체'~'청소년이' 라는 값 말고 다른 값을 할당해도 오류가 나지 않지만
// 이를 객체에 사용해서 key에 연결되는 value의 값을 '전체' 부터 '청소년이' 까지인 값으로 한정하라 라는 뜻으로 이해하였는데 맞을까요?
const TARGET_ITEM_LIST: TARGET_ITEM_LIST = {
  ALL: '전체',
  FEMALE: '여성이',
  MALE: '남성이',
  TEEN: '청소년이',
} as const;
type TARGET_ITEM_TYPE = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';

const StyledRankingSexTagItem = styled.div`
  width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
const isValidSelectedOption = (key: string): key is TARGET_ITEM_TYPE => {
  return TARGET_ITEM_LIST[key] !== undefined;
};

const RankingSexTagItem = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const [selected, setSelected] = useState<TARGET_ITEM_TYPE>('ALL');

  useEffect(() => {
    if (params.get('targetType') === null) {
      params.set('targetType', 'ALL');
      navigate(`?${params.toString()}`, { replace: true });
    } else {
      const key = params.get('targetType');
      if (key && isValidSelectedOption(key)) {
        setSelected(key);
      } else {
        params.set('targetType', selected);
        navigate(`?${params.toString()}`, { replace: true });
      }
    }
  }, [search, navigate, selected, params]);

  const handleClick = (key: TARGET_ITEM_TYPE) => {
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
