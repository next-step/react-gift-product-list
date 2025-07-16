import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import TargetSelectionPanel from "./subcomponents/TargetSelectionPanel";
import RankSelectionPanel from "./subcomponents/RankSelectionPanel";
import Card from "./subcomponents/Card";
import { simulatePagenation, type Product } from "@src/mock/productMockData";
import theme from "@src/styles/kakaoTheme";
import { useSearchParams } from "react-router-dom";
import { fetchRealTimeRankings } from "@src/apis/BackEnd/apiList";
import PendingSpinner from "../shared/PendingSpinner";
import useFetchState from "@src/hooks/useFetchState";

function RealTimeRankPanel() {
  const [productList, setCardList] = useState<Product[]>([]);
  const [productRenderList, setProductRenderList] = useState<Product[]>([]);
  const [expand, setExpand] = useState<boolean>(false);
  // const [currentPage, setCurrentPage] = useState<number>(0);

  const [searchParams] = useSearchParams();

  const update = useCallback(async () => {
    const targetType = searchParams.get("targetType") ?? "ALL";
    const rankType = searchParams.get("rankType") ?? "MANY_WISH";
    const data = await fetchRealTimeRankings(targetType, rankType);
    console.log(data);
    return data;
  }, [searchParams]);

  const fetchedProductList = useFetchState<Product[]>(update);

  useEffect(() => {
    if (fetchedProductList.status === "done" && fetchedProductList.data) {
      setCardList(fetchedProductList.data);
    }
  }, [fetchedProductList]);

  //try load next page
  // const nextPage = (): void => {
  //   const nextPage = currentPage + 1;
  //   const mockList = simulatePagenation(nextPage);
  //   if (mockList.length) {
  //     setCurrentPage((prev) => prev + 1);
  //     setCardList((prev) => [...prev, ...(mockList ?? [])]);
  //   }
  // };

  useEffect(() => {
    setProductRenderList(expand ? productList : productList.slice(0, 6));
  }, [expand, productList]);

  return (
    <RealTimeRankPanelWrapper>
      <TitleP>실시간 급상승 선물랭킹</TitleP>
      <TargetSelectionPanel />
      <RankSelectionPanel />
      {fetchedProductList.status === "pending" && <PendingSpinner />}
      {fetchedProductList.status === "done" && productList.length > 0 && (
        <>
          <CardPlaceHolder>
            {productRenderList.map((p, i) => {
              return <Card key={p.id} no={i + 1} prod={p} />;
            })}
          </CardPlaceHolder>
          {/*{" "}
          {expand && (
            <MoreButton
              onClick={() => {
                nextPage();
              }}
            >
              항목 더보기
            </MoreButton>
          )}{" "}
          */}
          {productList.length > 6 && (
            <ExpandButton
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? "접기" : "더보기"}
            </ExpandButton>
          )}
        </>
      )}
      {fetchedProductList.status === "error" ||
        (productList.length <= 0 && (
          <NoProduct>상품이 없거나 목록을 불러올 수 없습니다.</NoProduct>
        ))}
    </RealTimeRankPanelWrapper>
  );
}

const NoProduct = styled.div`
  margin: 20px;
  padding: 20px;
  width: calc(100% - 2 * 20px - 2 * 20px);
  border: 1px solid ${theme.colors.gray.gray300};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleP = styled.p`
  width: 95%;
  font-size: 20px;
  font-weight: bold;
`;

const MoreButton = styled.button`
  border: 2px solid ${theme.colors.gray.gray300};
  background-color: transparent;
  border-radius: 10px;
  width: 95%;
  height: 100px;
`;

const ExpandButton = styled.button`
  border: 2px solid ${theme.colors.gray.gray300};
  background-color: transparent;
  border-radius: 10px;
  width: 95%;
  height: 100px;
  margin-bottom: 100px;
`;

const CardPlaceHolder = styled.div`
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const RealTimeRankPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
`;

export default RealTimeRankPanel;
