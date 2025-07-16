/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "@emotion/react";

import * as S from "./RankingSection.styles";
import { RankingCard } from "./RankingCard";
import { fetchRanking } from "@/api/ranking";
import type { RankingItem, RankType, TargetType } from "@/api/ranking";
import { Spinner } from "@/components/common/Spinner";

const GROUP_PARAM = "group";
const ACTION_PARAM = "action";
const ITEM_COUNT = 6;

const groupOptions: { key: TargetType; label: string; icon: string }[] = [
  { key: "ALL", label: "전체", icon: "ALL" },
  { key: "FEMALE", label: "여성이", icon: "👩🏻" },
  { key: "MALE", label: "남성이", icon: "👨🏻" },
  { key: "TEEN", label: "청소년이", icon: "👦🏻" },
];

const actionOptions: { key: RankType; label: string }[] = [
  { key: "MANY_WISH", label: "받고 싶어한" },
  { key: "MANY_RECEIVE", label: "많이 선물한" },
  { key: "MANY_WISH_RECEIVE", label: "위시로 받은" },
];

export const RankingSection = () => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const group = (searchParams.get(GROUP_PARAM) || "ALL") as TargetType;
  const action = (searchParams.get(ACTION_PARAM) || "MANY_WISH") as RankType;

  const [data, setData] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const visibleItems = useMemo(() => {
    return isExpanded ? data : data.slice(0, ITEM_COUNT);
  }, [isExpanded, data]);

  const fetchRankingData = async () => {
    try {
      setLoading(true);
      const result = await fetchRanking({ targetType: group, rankType: action });
      setData(result);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingData();
  }, [group, action]);

  const renderContent = () => {
    if (loading) {
      return (
        <S.LoadingWrapper>
          <Spinner size={48} />
        </S.LoadingWrapper>
      );
    }

    if (error || data.length === 0) {
      return <EmptyState>상품이 없습니다.</EmptyState>;
    }

    return (
      <div css={S.grid(theme)}>
        {visibleItems.map((item, idx) => (
          <RankingCard
            key={item.id}
            rank={idx + 1}
            id={item.id}
            imageURL={item.imageURL}
            brandName={item.brandInfo.name}
            productName={item.name}
            price={item.price.sellingPrice}
          />
        ))}
      </div>
    );
  };

  return (
    <section css={S.section(theme)}>
      <h3 css={S.title(theme)}>실시간 급상승 선물랭킹</h3>

      <div css={S.filterContainer(theme)}>
        <div css={S.groupFilterContainer(theme)}>
          {groupOptions.map(({ key, label, icon }) => (
            <button
              key={key}
              css={S.groupButton}
              onClick={() => updateParam(GROUP_PARAM, key)}
            >
              <div css={S.groupIcon(theme, group === key)}>{icon}</div>
              <p css={S.groupText(theme, group === key)}>{label}</p>
            </button>
          ))}
        </div>

        <div css={S.actionFilter(theme)}>
          {actionOptions.map(({ key, label }) => (
            <button
              key={key}
              css={S.actionButton(theme, action === key)}
              onClick={() => updateParam(ACTION_PARAM, key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {renderContent()}

      {!loading && data.length > ITEM_COUNT && (
        <button css={S.moreButton(theme)} onClick={() => setIsExpanded((prev) => !prev)}>
          <p>{isExpanded ? "접기" : "더보기"}</p>
        </button>
      )}
    </section>
  );
};

const EmptyState = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return <div css={S.EmptyStateWrapper(theme)}>{children}</div>;
};
