import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { useApiRequest } from "@/hooks/useApiRequest";
import type { Product } from "@/types/api_types";
import LoadingSpinner from "@/components/common/LoadingSpinner";

type ThemeProductResponse = {
  list: Product[];
};

export default function ThemeProductsList() {
  const { themeId } = useParams<{ themeId: string }>();
  const { data, status, error } = useApiRequest<ThemeProductResponse>({
    url: `/api/themes/${themeId}/products`,
  });

  if (status === "loading") return <LoadingSpinner />;
  if (!data || data.list.length === 0)
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;

  return (
    <List>
      {data.list.map((product) => (
        <Card key={product.id}>
          <Image src={product.imageURL} alt={product.name} />
          <Name>{product.name}</Name>
          <Brand>{product.brandInfo.name}</Brand>
          <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        </Card>
      ))}
    </List>
  );
}

const EmptyMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin-top: 50px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const Card = styled.div`
  overflow: hidden;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 30px;
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin: 8px 0;
`;

const Brand = styled.div`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  margin: 8px 0;
`;

const Price = styled.div`
  font-size: ${({ theme }) => theme.typography.subtitle1Regular.fontSize};
  font-weight: bold;
  margin: 8px 0;
`;
