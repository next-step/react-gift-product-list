import Loading from "@/components/common/Loading";
import { ROUTE_PATH } from "@/components/routes/routePath";
import useFetch from "@/hooks/useFetch";
import type { RankingProductType } from "@/types/RankingProductType";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProductListData {
  list: RankingProductType[];
  cursor: number;
  hasMoreList: boolean;
}

const PRODUCT_LIST_LIMIT = 20;

const ProductList = () => {
  const navigate = useNavigate();
  const goOrderPage = useCallback(
    (itemId: number) => {
      navigate(`${ROUTE_PATH.ORDER}/${itemId}`);
    },
    [navigate],
  );

  const [items, setItems] = useState<RankingProductType[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMoreList, setHasMoreList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef<HTMLDivElement>(null);

  const { themeId } = useParams();
  const productList = useFetch<ProductListData>(`/api/themes/${themeId}/products`, {
    autoFetch: false,
  });

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMoreList) return null;

    try {
      setIsLoading(true);
      const response = await productList.fetchData(undefined, undefined, {
        cursor,
        limit: PRODUCT_LIST_LIMIT,
      });
      if (response.data) {
        setItems((prev) => [...prev, ...(response.data?.list ?? [])]);
        setCursor(response.data.cursor);
        setHasMoreList(response.data.hasMoreList);
      }
    } catch (error) {
      console.error("상품 목록을 불러오는데 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMoreList, isLoading, productList.fetchData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting && hasMoreList && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold: 0.5 },
    );

    const el = loader.current;
    if (el && hasMoreList) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [cursor, hasMoreList, loadMoreItems, isLoading]);

  return (
    <Container>
      <Content>
        {items.map((item) => (
          <Item key={item.id} onClick={() => goOrderPage(item.id)}>
            <ItemContent>
              <ItemContentImg src={item.imageURL} alt={item.name} />
              <ItemContentBrand>{item.brandInfo.name}</ItemContentBrand>
              <ItemContentTitle>{item.name}</ItemContentTitle>
              <ItemContentPrice>{item.price.sellingPrice}원</ItemContentPrice>
            </ItemContent>
          </Item>
        ))}
      </Content>
      <Loader ref={loader}>
        {isLoading && <Loading height="50px" />}
        {!hasMoreList && items.length === 0 && <Empty>상품이 없습니다.</Empty>}
        {!hasMoreList && items.length > 0 && <EndMessage>모든 상품을 불러왔습니다.</EndMessage>}
      </Loader>
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  width: 100%;
  height: calc(100vh - 44px - 128px);
  padding: ${({ theme }) => theme.spacing.spacing4};
`;
const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.spacing6} ${({ theme }) => theme.spacing.spacing2};
`;
const Item = styled.div`
  width: 100%;
  cursor: pointer;
`;
const ItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ItemContentImg = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;
const ItemContentBrand = styled.p`
  font: ${({ theme }) => theme.typography.subtitle2Regular};
  color: ${({ theme }) => theme.color.textColor.sub};
  margin-right: auto;
`;
const ItemContentTitle = styled.h6`
  font: ${({ theme }) => theme.typography.subtitle2Bold};
  color: ${({ theme }) => theme.color.textColor.default};
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
`;
const ItemContentPrice = styled.p`
  font: ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.color.textColor.default};
  margin-right: auto;
  word-break: break-word;
`;
const Loader = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Empty = styled.div`
  width: 100%;
  font: ${({ theme }) => theme.typography.subtitle2Regular};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.textColor.sub};
`;

const EndMessage = styled.div`
  width: 100%;
  font: ${({ theme }) => theme.typography.subtitle2Regular};
  color: ${({ theme }) => theme.color.textColor.sub};
  display: flex;
  justify-content: center;
  align-items: center;
`;
