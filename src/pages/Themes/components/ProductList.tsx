import Loading from "@/components/common/Loading";
import { ROUTE_PATH } from "@/components/routes/routePath";
import useFetch from "@/hooks/useFetch";
import type { RankingProductType } from "@/types/RankingProductType";
import styled from "@emotion/styled";
import { useCallback } from "react";
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

  const { themesId } = useParams();
  const { data, isLoading } = useFetch<ProductListData>(`/api/themes/${themesId}/products`, {
    params: {
      cursor: 0,
      limit: PRODUCT_LIST_LIMIT,
    },
  });

  if (isLoading) {
    return <Loading height="2353px" />;
  }

  if (!data) {
    return null;
  }

  return (
    <Container>
      <Content>
        {data.list.map((item) => (
          <Item key={item.id} onClick={() => goOrderPage(item.id)}>
            <ItemContent>
              <ItemContentImg src={item.imageURL} />
              <ItemContentBrand>{item.brandInfo.name}</ItemContentBrand>
              <ItemContentTitle>{item.name}</ItemContentTitle>
              <ItemContentPrice>{item.price.sellingPrice}원</ItemContentPrice>
            </ItemContent>
          </Item>
        ))}
      </Content>
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  width: 100%;
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
