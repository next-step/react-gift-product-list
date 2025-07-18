import { rankingRankCategoryList, rankingTargetCategory } from "@/assets/rankingCategory";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useRankingFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const targetTypeParams = searchParams.get("targetType")?.trim();
  const rankTypeParams = searchParams.get("rankType")?.trim();

  const isValidTarget = targetTypeParams && rankingTargetCategory.some((item) => item.targetType === targetTypeParams);
  const isValidRank = rankTypeParams && rankTypeParams in rankingRankCategoryList;

  const selectedTarget = useMemo(
    () => (isValidTarget ? targetTypeParams : rankingTargetCategory[0].targetType),
    [targetTypeParams, isValidTarget],
  );
  const selectedRank = useMemo(
    () => (isValidRank ? rankTypeParams : Object.keys(rankingRankCategoryList)[0]),
    [rankTypeParams, isValidRank],
  );

  const changeTargetType = useCallback(
    (targetType: string) => {
      searchParams.set("targetType", targetType);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );
  const changeRankType = useCallback(
    (rankType: string) => {
      searchParams.set("rankType", rankType);
      setSearchParams(searchParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  return { selectedTarget, selectedRank, changeTargetType, changeRankType };
};

export default useRankingFilter;
