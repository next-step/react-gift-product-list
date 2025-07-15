/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RankingCard } from "./RankingCard";
import type { ThemeType } from "@/styles/theme/theme";
import { fetchRanking } from "@/api/ranking";
import type { RankingItem } from "@/api/ranking";
import { Spinner } from "@/components/common/Spinner";

const GROUP_PARAM = "group";
const ACTION_PARAM = "action";

const groupOptions = [
  { key: "ALL", label: "전체", icon: "ALL" },
  { key: "FEMALE", label: "여성이", icon: "👩🏻" },
  { key: "MALE", label: "남성이", icon: "👨🏻" },
  { key: "TEEN", label: "청소년이", icon: "👦🏻" },
] as const;

const actionOptions = [
  { key: "MANY_WISH", label: "받고 싶어한" },
  { key: "MANY_RECEIVE", label: "많이 선물한" },
  { key: "MANY_WISH_RECEIVE", label: "위시로 받은" },
] as const;

type TargetType = (typeof groupOptions)[number]["key"];
type RankType = (typeof actionOptions)[number]["key"];

export const RankingSection = () => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const group = (searchParams.get(GROUP_PARAM) || "ALL") as TargetType;
  const action = (searchParams.get(ACTION_PARAM) || "MANY_WISH") as RankType;

  const [data, setData] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchRanking({
          targetType: group,
          rankType: action,
        });
        setData(result);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [group, action]);

  return (
    <section css={section(theme)}>
      <h3 css={title(theme)}>실시간 급상승 선물랭킹</h3>

      <div css={filterContainer(theme)}>
        <div css={groupFilterContainer(theme)}>
          {groupOptions.map(({ key, label, icon }) => (
            <button
              key={key}
              css={groupButton}
              onClick={() => updateParam(GROUP_PARAM, key)}
            >
              <div css={groupIcon(theme, group === key)}>{icon}</div>
              <p css={groupText(theme, group === key)}>{label}</p>
            </button>
          ))}
        </div>

        <div css={actionFilter(theme)}>
          {actionOptions.map(({ key, label }) => (
            <button
              key={key}
              css={actionButton(theme, action === key)}
              onClick={() => updateParam(ACTION_PARAM, key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingWrapper>
          <Spinner size={48} />
        </LoadingWrapper>
      ) : error || data.length === 0 ? (
        <EmptyState>상품이 없습니다.</EmptyState>
      ) : (
        <div css={grid(theme)}>
          {(isExpanded ? data : data.slice(0, 6)).map((item, idx) => (
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
      )}

      {!loading && data.length > 6 && (
        <button css={moreButton(theme)} onClick={() => setIsExpanded((prev) => !prev)}>
          <p>{isExpanded ? "접기" : "더보기"}</p>
        </button>
      )}
    </section>
  );
};


const section = (theme: ThemeType) => css`
  padding: ${theme.spacing.spacing4};
  background-color: white;
`;

const title = (theme: ThemeType) => css`
  ${theme.typography.title1Bold};
  color: ${theme.colors.textDefault};
  margin-bottom: ${theme.spacing.spacing4};
`;

const filterContainer = (theme: ThemeType) => css`
  margin-bottom: ${theme.spacing.spacing4};
`;

const groupFilterContainer = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.spacing3};
`;

const groupButton = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
`;

const groupIcon = (theme: ThemeType, isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: ${theme.spacing.spacing1};
  border-radius: 17px;
  ${theme.typography.label1Bold};
  background-color: ${isSelected ? theme.colors.blue700 : theme.colors.blue100};
  color: ${isSelected ? theme.colors.blue200 : theme.colors.blue400};
`;

const groupText = (theme: ThemeType, isSelected: boolean) => css`
  ${isSelected ? theme.typography.label1Bold : theme.typography.label1Regular};
  color: ${isSelected ? theme.colors.blue700 : theme.colors.gray700};
`;

const actionFilter = (theme: ThemeType) => css`
  display: flex;
  justify-content: space-around;
  padding: ${theme.spacing.spacing4};
  background-color: ${theme.colors.blue100};
  border-radius: 10px;
`;

const actionButton = (theme: ThemeType, isSelected: boolean) => css`
  cursor: pointer;
  color: ${isSelected ? theme.colors.blue700 : theme.colors.gray700};
  ${isSelected ? theme.typography.label1Bold : theme.typography.label1Regular};
`;

const grid = (theme: ThemeType) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const moreButton = (theme: ThemeType) => css`
  width: 100%;
  padding: ${theme.spacing.spacing3};
  border: 1px solid ${theme.colors.gray300};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  ${theme.typography.body1Regular};
  color: ${theme.colors.textDefault};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
`;

const emptyState = (theme: ThemeType) => css`
  text-align: center;
  color: ${theme.colors.gray700};
  ${theme.typography.body1Regular};
  margin-top: 20px;
`;

const EmptyState = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return <div css={emptyState(theme)}>{children}</div>;
};
