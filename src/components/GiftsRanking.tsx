import styled from "@emotion/styled";
import GiftTargetType from "./GiftTargetType";
import { targetType, rankType } from "@/data/giftType";
import { isValidTargetType, isValidRankType } from "@/utils/typeGuards";
import type { Gift } from "@/types/gift";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { fetchProductsRanking } from "@/api/products";
import GiftsRender from "./GiftsRender";

const GiftsRanking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const targetTypeParam = searchParams.get("targetType") || targetType[0].id;
  const rankTypeParam = searchParams.get("rankType") || rankType[0].id;
  const [selectedTypes, setSelectedTypes] = useState({
    targetType: isValidTargetType(targetTypeParam)
      ? targetTypeParam
      : targetType[0].id,
    rankType: isValidRankType(rankTypeParam) ? rankTypeParam : rankType[0].id,
  });

  const [gifts, setGifts] = useState<Gift[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleFilterChange = (key: string, selectedType: string) => {
    const newSelectedTypes = { ...selectedTypes, [key]: selectedType };
    setSelectedTypes(newSelectedTypes);

    const searchParams = new URLSearchParams(newSelectedTypes);
    setSearchParams(searchParams, { replace: true });
  };

  useEffect(() => {
    fetchProductsRanking(selectedTypes.targetType, selectedTypes.rankType)
      .then(data => {
        setGifts(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [selectedTypes]);

  return (
    <Background>
      <RankingTitle>실시간 급상승 선물랭킹</RankingTitle>
      <GiftTargetTypeFlex>
        {targetType.map((type, index) => (
          <GiftTargetType
            key={index}
            icon={type.icon}
            name={type.name}
            selected={selectedTypes.targetType === type.id}
            onClick={() => handleFilterChange("targetType", type.id)}
          />
        ))}
      </GiftTargetTypeFlex>
      <GiftRankTypeFlex>
        {rankType.map((type, index) => (
          <GiftRankType
            key={index}
            selected={selectedTypes.rankType === type.id}
            onClick={() => handleFilterChange("rankType", type.id)}
          >
            {type.name}
          </GiftRankType>
        ))}
      </GiftRankTypeFlex>
      <GiftsRender gifts={gifts} isLoading={isLoading} isError={isError} />
    </Background>
  );
};

export default GiftsRanking;

const Background = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const RankingTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing5} ${theme.spacing.spacing2}`};
`;

const GiftTargetTypeFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  padding: ${({ theme }) => `${theme.spacing.spacing4} 0`};
`;

const GiftRankTypeFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue.blue100};
  padding: ${({ theme }) =>
    `${theme.spacing.spacing3} ${theme.spacing.spacing4}`};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.blue.blue300};
`;

const GiftRankType = styled.p<{ selected: boolean }>`
  width: 100%;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme, selected }) =>
    selected
      ? theme.typography.body2Bold.fontWeight
      : theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.blue.blue700 : theme.colors.blue.blue500};
  margin: ${({ theme }) => theme.spacing.spacing0};
  transition:
    color 200ms,
    font-weight 200ms;
  cursor: pointer;
`;
