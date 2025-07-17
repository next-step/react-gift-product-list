import TargetCategory from "./TargetCategory";
import RankingCategory from "./RankingCategory";
import RankingItem from "./RankingItem";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  SectionContainer,
  SectionTitle,
} from "@/components/Common/SectionLayout";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/useAuthContext";
import { getRanking } from "@/api/products";
import type { BasicGiftProduct } from "@/types/gift";
import { LoadingSpinner } from "@/components/Common/LoadingSpinner";

const RankingSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [rankingItems, setRankingItems] = useState<BasicGiftProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const RANK_COUNT = showAll ? 21 : 6;
  const toggleShowAll = () => setShowAll((prev) => !prev);

  const navigate = useNavigate();
  const isLoggedIn = useAuthContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const targetType = searchParams.get("targetType") || "ALL";
  const rankType = searchParams.get("rankType") || "MANY_WISH";

  const handleGenderChange = (newTarget: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("targetType", newTarget);
      return newParams;
    });
  };

  const handleCategoryChange = (newRankType: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("rankType", newRankType);
      return newParams;
    });
  };

  const handleClickItem = (productId: number) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: { pathname: `/order/${productId}` } },
      });
    } else {
      navigate(`/order/${productId}`);
    }
  };

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        const res = await getRanking(targetType, rankType);
        setRankingItems(res.data.data);
      } catch (err) {
        console.error(err);
        setError("랭킹데이터 에러");
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [targetType, rankType]);

  if (error) {
    return (
      <ErrorMessage>
        <>상품이 없습니다.</>
      </ErrorMessage>
    );
  }

  return (
    <SectionContainer>
      <SectionTitle>실시간 급상승 선물랭킹</SectionTitle>
      <TargetCategory selected={targetType} onChange={handleGenderChange} />
      <RankingCategory selected={rankType} onChange={handleCategoryChange} />
      {loading ? (
        <LoadingSpinner color="#ffffff" loading={loading} size={35} />
      ) : (
        <RankingGrid>
          {rankingItems.slice(0, RANK_COUNT).map((item, index) => (
            <RankingItem
              key={item.id}
              rank={index + 1}
              id={item.id}
              name={item.name}
              imageURL={item.imageURL}
              price={item.price}
              brandInfo={item.brandInfo}
              onClick={() => handleClickItem(item.id)}
            />
          ))}
        </RankingGrid>
      )}
      <MoreButton onClick={toggleShowAll}>
        {showAll ? "접기" : "더보기"}
      </MoreButton>
    </SectionContainer>
  );
};

export default RankingSection;

const RankingGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 8px;
  margin-top: ${({ theme }) => theme.spacing.spacing2};
`;

const MoreButton = styled.button`
  margin: ${({ theme }) => theme.spacing.spacing3} auto 0;
  width: 100%;
  display: block;
  font-weight: bold;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.gray500};
  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  color: ${({ theme }) => theme.colors.gray700};
  cursor: pointer;
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.gray500};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray200};
    border: 1px solid ${({ theme }) => theme.colors.gray500};
  }

  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  backgorund-color: ${({ theme }) => theme.colors.backgroundDefault};
`;
