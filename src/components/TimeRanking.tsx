import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Spacing from "./Spacing";
import { get } from "@/services/request";

const genderOptions = [
  { label: "ALL", icon: "ALL", value: "ALL" },
  { label: "여성이", icon: "👩🏻", value: "여성" },
  { label: "남성이", icon: "👨🏻", value: "남성" },
  { label: "청소년이", icon: "🧒🏻", value: "청소년" },
] as const;

const RankTypeOptions = ["받고 싶어한", "많이 선물한", "위시로 받은"] as const;

type Gender = "ALL" | "여성" | "남성" | "청소년";
type TargetType = "ALL" | "FEMALE" | "MALE" | "TEEN";
type Rank = "받고 싶어한" | "많이 선물한" | "위시로 받은";
type RankType = "MANY_WISH" | "MANY_RECEIVE" | "MANY_WISH_RECEIVE";

type Product = {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    name: string;
  };
};

export default function TimeRanking() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedGender, setSelectedGender] = useState(
    () => searchParams.get("gender") || "ALL"
  );
  const [selectedRankType, setSelectedRankType] = useState(
    () => searchParams.get("rankType") || "받고 싶어한"
  );
  const [showAll, setShowAll] = useState(false);

  const [rankings, setRankings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      setError(false);
      try {
        const [data] = await Promise.all([
          get<{ data: Product[] }>("/products/ranking", {
            queryParams: {
              targetType: searchTargetType(selectedGender),
              rankType: searchRankType(selectedRankType),
            },
          }),
          new Promise((resolve) => setTimeout(resolve, 300)),
        ]);
        if (Array.isArray(data.data)) {
          setRankings(data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, [selectedGender, selectedRankType]);

  const searchTargetType = (gender: string): TargetType => {
    switch (gender) {
      case "여성":
        return "FEMALE";
      case "남성":
        return "MALE";
      case "청소년":
        return "TEEN";
      default:
        return "ALL";
    }
  };

  const searchRankType = (rank: string): RankType => {
    switch (rank) {
      case "많이 선물한":
        return "MANY_RECEIVE";
      case "위시로 받은":
        return "MANY_WISH_RECEIVE";
      default:
        return "MANY_WISH";
    }
  };

  const changeGender = (value: Gender) => {
    setSelectedGender(value);
    searchParams.set("gender", value);
    setSearchParams(searchParams);
  };

  const changeRankType = (value: Rank) => {
    setSelectedRankType(value);
    searchParams.set("rankType", value);
    setSearchParams(searchParams);
  };

  const goToOrder = (itemId: number) => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) navigate(`/order/${itemId}`);
    else
      navigate("/login", {
        state: { from: `/order/${itemId}` },
      });
  };

  const itemsToShow = showAll ? rankings : rankings.slice(0, 6);

  return (
    <Container>
      <Spacing height="40px" />
      <Title>실시간 급상승 선물랭킹</Title>
      <Spacing height="20px" />

      <GenderBox>
        {genderOptions.map(({ label, icon, value }) => (
          <GenderTab key={value}>
            <GenderButton
              isSelected={selectedGender === value}
              onClick={() => changeGender(value)}
            >
              {icon}
            </GenderButton>
            <GenderText>{label}</GenderText>
          </GenderTab>
        ))}
      </GenderBox>

      <Spacing height="16px" />

      <RankingBox>
        {RankTypeOptions.map((tab) => (
          <RankingTab
            key={tab}
            isSelected={selectedRankType === tab}
            onClick={() => changeRankType(tab)}
          >
            {tab}
          </RankingTab>
        ))}
      </RankingBox>

      <Spacing height="16px" />

      {loading ? (
        <Spinner />
      ) : rankings.length === 0 ? (
        <EmptyBox>
          <EmptyMessage>상품이 없습니다.</EmptyMessage>
        </EmptyBox>
      ) : (
        <>
          <CardGrid>
            {itemsToShow.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                onClick={() => goToOrder(item.id)}
              >
                <RankLabel>{index + 1}</RankLabel>
                <Image src={item.imageURL} alt={item.name} />
                <Spacing height="12px" />
                <Brand>{item.brandInfo.name}</Brand>
                <Name>{item.name}</Name>
                <Price>{item.price.sellingPrice.toLocaleString()}원</Price>
              </Card>
            ))}
          </CardGrid>

          {rankings.length > 6 && (
            <>
              <Spacing height="32px" />
              <ButtonWrapper>
                <ToggleButton onClick={() => setShowAll((prev) => !prev)}>
                  {showAll ? "접기" : "더보기"}
                </ToggleButton>
              </ButtonWrapper>
            </>
          )}
        </>
      )}

      <Spacing height="40px" />
    </Container>
  );
}

const Container = styled.section`
  padding: 0 16px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.title1Bold};
  margin: 0;
`;

const GenderBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const GenderTab = styled.div`
  width: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const GenderButton = styled.button<{ isSelected: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray.white : theme.colors.blue[400]};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue[700] : theme.colors.blue[100]};
  ${({ theme }) => theme.typography.subtitle2Bold};
`;

const GenderText = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray[700]};
  text-align: center;
`;

const RankingBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(70, 132, 233, 0.1);
  background-color: ${({ theme }) => theme.colors.blue[100]};
  border-radius: 8px;
  padding: 12px 16px;
`;

const RankingTab = styled.button<{ isSelected: boolean }>`
  flex: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: center;
  ${({ theme, isSelected }) =>
    isSelected ? theme.typography.label1Bold : theme.typography.label1Regular};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.blue[700] : theme.colors.blue[400]};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
  margin-top: 16px;
`;

const Card = styled.div`
  position: relative;
  cursor: pointer;
`;

const RankLabel = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 1;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.red[600]};
  color: ${({ theme }) => theme.colors.text.default};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.typography.label2Bold};
`;

const Image = styled.img`
  width: 100%;
  border-radius: 4px;
`;

const Brand = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Name = styled.p`
  margin: 0;
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.p`
  margin: 4px 0 0;
  ${({ theme }) => theme.typography.subtitle1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
`;

const ToggleButton = styled.button`
  max-width: 480px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  padding: 12px;
  border-radius: 4px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme }) => theme.typography.body2Regular};
  cursor: pointer;
  text-align: center;
`;

const Spinner = styled.div`
  margin: 40px auto;
  width: 25px;
  height: 25px;
  border: 4px solid #ccc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const EmptyMessage = styled.p`
  ${({ theme }) => theme.typography.body2Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  width: 100%;
  text-align: center;
`;
